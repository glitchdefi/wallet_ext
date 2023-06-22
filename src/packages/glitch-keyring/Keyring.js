import { createPair } from '@polkadot/keyring';
import { chains } from '@polkadot/ui-settings';
import { bnToBn, hexToU8a, isFunction, isHex, isString, objectSpread, stringify, stringToU8a, u8aSorted, u8aToString } from '@polkadot/util';
import { base64Decode, createKeyMulti, jsonDecrypt, jsonEncrypt } from '@polkadot/util-crypto';
import { env } from './observable/env.js';
import { KeyringOption } from './options/index.js';
import { Base } from './Base.js';
import { accountKey, accountRegex, addressKey, addressRegex, contractKey, contractRegex } from './defaults.js';
const RECENT_EXPIRY = 24 * 60 * 60;
export class Keyring extends Base {
    constructor() {
        super(...arguments);
        this.keyringOption = new KeyringOption();
        this.__internal__stores = {
            account: () => this.accounts,
            address: () => this.addresses,
            contract: () => this.contracts
        };
    }
    async addExternal(address, meta = {}) {
        const pair = this.keyring.addFromAddress(address, objectSpread({}, meta, { isExternal: true }), null);
        const json = await this.saveAccount(pair);
        return {
            json,
            pair
        };
    }
    async addHardware(address, hardwareType, meta = {}) {
        return await this.addExternal(address, objectSpread({}, meta, { hardwareType, isHardware: true }));
    }
    async addMultisig(addresses, threshold, meta = {}) {
        let address = createKeyMulti(addresses, threshold);
        // For Ethereum chains, the first 20 bytes of the hash indicates the actual address
        // Testcases via creation and on-chain events:
        // -  input: 0x7a1671a0224c8927b08f978027d586ab6868de0d31bb5bc956b625ced2ab18c4
        // - output: 0x7a1671a0224c8927b08f978027d586ab6868de0d
        if (this.isEthereum) {
            address = address.slice(0, 20);
        }
        // we could use `sortAddresses`, but rather use internal encode/decode so we are 100%
        const who = u8aSorted(addresses.map((who) => this.decodeAddress(who))).map((who) => this.encodeAddress(who));
        return await this.addExternal(address, objectSpread({}, meta, { isMultisig: true, threshold: bnToBn(threshold).toNumber(), who }));
    }
    async addPair(pair, password) {
        this.keyring.addPair(pair);
        const json = await this.saveAccount(pair, password);
        return {
            json,
            pair
        };
    }
    async addUri(suri, password, meta = {}, type) {
        const pair = this.keyring.addFromUri(suri, meta, type);
        const json = await this.saveAccount(pair, password);
        return {
            json,
            pair
        };
    }
    backupAccount(pair, password) {
        if (!pair.isLocked) {
            pair.lock();
        }
        pair.decodePkcs8(password);
        return pair.toJson(password);
    }
    async backupAccounts(addresses, password) {
        const accountPromises = addresses.map((address) => {
            return new Promise(async (resolve) => {
                const data = await this._forageStore.get(accountKey(address));
                resolve(data);
            });
        });
        const accounts = await Promise.all(accountPromises);
        return objectSpread({}, jsonEncrypt(stringToU8a(JSON.stringify(accounts)), ['batch-pkcs8'], password), {
            accounts: accounts.map((account) => ({
                address: account.address,
                meta: account.meta
            }))
        });
    }
    createFromJson(json, meta = {}) {
        return this.keyring.createFromJson(objectSpread({}, json, {
            meta: objectSpread({}, json.meta, meta)
        }));
    }
    createFromUri(suri, meta = {}, type) {
        return this.keyring.createFromUri(suri, meta, type);
    }
    async encryptAccount(pair, password) {
        const json = pair.toJson(password);
        json.meta.whenEdited = Date.now();
        this.keyring.addFromJson(json);
        await this.accounts.add(this._forageStore, pair.address, json, pair.type);
    }
    async forgetAccount(address) {
        this.keyring.removePair(address);
        await this.accounts.remove(this._forageStore, address);
    }
    async forgetAddress(address) {
        await this.addresses.remove(this._forageStore, address);
    }
    async forgetContract(address) {
        await this.contracts.remove(this._forageStore, address);
    }
    getAccount(address) {
        return this.getAddress(address, 'account');
    }
    getAccounts() {
        const available = this.accounts.subject.getValue();
        return Object
            .keys(available)
            .map((address) => this.getAddress(address, 'account'))
            .filter((account) => env.isDevelopment() || account.meta.isTesting !== true);
    }
    getAddress(_address, type = null) {
        const address = isString(_address)
            ? _address
            : this.encodeAddress(_address);
        const publicKey = this.decodeAddress(address);
        const stores = type
            ? [this.__internal__stores[type]]
            : Object.values(this.__internal__stores);
        const info = stores.reduce((lastInfo, store) => (store().subject.getValue()[address] || lastInfo), undefined);
        return info && {
            address,
            meta: info.json.meta,
            publicKey
        };
    }
    getAddresses() {
        const available = this.addresses.subject.getValue();
        return Object
            .keys(available)
            .map((address) => this.getAddress(address));
    }
    getContract(address) {
        return this.getAddress(address, 'contract');
    }
    getContracts() {
        const available = this.contracts.subject.getValue();
        return Object
            .entries(available)
            .filter(([, { json: { meta: { contract } } }]) => !!contract && contract.genesisHash === this.genesisHash)
            .map(([address]) => this.getContract(address));
    }
    async rewriteKey(json, key, hexAddr, creator) {
        if (hexAddr.substring(0, 2) === '0x') {
            return;
        }
        await this._forageStore.remove(key);
        await this._forageStore.set(creator(hexAddr), json);
    }
    async loadAccount(json, key) {
        if (!json.meta.isTesting && json.encoded) {
            const pair = this.keyring.addFromJson(json, true);
            await this.accounts.add(this._forageStore, pair.address, json, pair.type);
        }
        const [, hexAddr] = key.split(':');
        await this.rewriteKey(json, key, hexAddr.trim(), accountKey);
    }
    async loadAddress(json, key) {
        const { isRecent, whenCreated = 0 } = json.meta;
        if (isRecent && (Date.now() - whenCreated) > RECENT_EXPIRY) {
            await this._forageStore.remove(key);
            return;
        }
        // We assume anything hex that is not 32bytes (64 + 2 bytes hex) is an Ethereum-like address
        // (this caters for both H160 addresses as well as full or compressed publicKeys) - in the case
        // of both ecdsa and ethereum, we keep it as-is
        const address = isHex(json.address) && json.address.length !== 66
            ? json.address
            : this.encodeAddress(isHex(json.address)
                ? hexToU8a(json.address)
                // FIXME Just for the transition period (ignoreChecksum)
                : this.decodeAddress(json.address, true));
        const [, hexAddr] = key.split(':');
        await this.addresses.add(this._forageStore, address, json);
        await this.rewriteKey(json, key, hexAddr, addressKey);
    }
    async loadContract(json, key) {
        const address = this.encodeAddress(this.decodeAddress(json.address));
        const [, hexAddr] = key.split(':');
        // move genesisHash to top-level (TODO Remove from contracts section?)
        json.meta.genesisHash = json.meta.genesisHash || (json.meta.contract && json.meta.contract.genesisHash);
        await this.contracts.add(this._forageStore, address, json);
        await this.rewriteKey(json, key, hexAddr, contractKey);
    }
    async loadInjected(address, meta, type) {
        const json = {
            address,
            meta: objectSpread({}, meta, { isInjected: true })
        };
        const pair = this.keyring.addFromAddress(address, json.meta, null, type);
        await this.accounts.add(this._forageStore, pair.address, json, pair.type);
    }
    allowGenesis(json) {
        if (json && json.meta && this.genesisHash) {
            const hashes = Object.values(chains).find((hashes) => hashes.includes(this.genesisHash || '')) || [this.genesisHash];
            if (json.meta.genesisHash) {
                return hashes.includes(json.meta.genesisHash) || this.genesisHashes.includes(json.meta.genesisHash);
            }
            else if (json.meta.contract) {
                return hashes.includes(json.meta.contract.genesisHash);
            }
        }
        return true;
    }
    async loadAll(options, injected = []) {
        await super.initKeyring(options);
        this._forageStore.all(async (key, json) => {
            if (!isFunction(options.filter) || options.filter(json)) {
                try {
                    if (this.allowGenesis(json)) {
                        if (accountRegex.test(key)) {
                            await this.loadAccount(json, key);
                        }
                        else if (addressRegex.test(key)) {
                            await this.loadAddress(json, key);
                        }
                        else if (contractRegex.test(key)) {
                            await this.loadContract(json, key);
                        }
                    }
                }
                catch {
                    console.warn(`Keyring: Unable to load ${key}:${stringify(json)}`);
                }
            }
        });
        injected.forEach(async (account) => {
            if (this.allowGenesis(account)) {
                try {
                    await this.loadInjected(account.address, account.meta, account.type);
                }
                catch {
                    console.warn(`Keyring: Unable to inject ${stringify(account)}`);
                }
            }
        });
        this.keyringOption.init(this);
    }
    restoreAccount(json, password) {
        const cryptoType = Array.isArray(json.encoding.content) ? json.encoding.content[1] : 'ed25519';
        const encType = Array.isArray(json.encoding.type) ? json.encoding.type : [json.encoding.type];
        const pair = createPair({ toSS58: this.encodeAddress, type: cryptoType }, { publicKey: this.decodeAddress(json.address, true) }, json.meta, isHex(json.encoded) ? hexToU8a(json.encoded) : base64Decode(json.encoded), encType);
        // unlock, save account and then lock (locking cleans secretKey, so needs to be last)
        pair.decodePkcs8(password);
        this.addPair(pair, password);
        pair.lock();
        return pair;
    }
    restoreAccounts(json, password) {
        const accounts = JSON.parse(u8aToString(jsonDecrypt(json, password)));
        accounts.forEach(async (account) => {
            await this.loadAccount(account, accountKey(account.address));
        });
    }
    async saveAccount(pair, password) {
        this.addTimestamp(pair);
        const json = pair.toJson(password);
        this.keyring.addFromJson(json);
        await this.accounts.add(this._forageStore, pair.address, json, pair.type);
        return json;
    }
    async saveAccountMeta(pair, meta) {
        const address = pair.address;
        const json = await this._forageStore.get(accountKey(address));
        pair.setMeta(meta);
        json.meta = pair.meta;
        await this.accounts.add(this._forageStore, address, json, pair.type);
    }
    async saveAddress(address, meta, type = 'address') {
        const available = this.addresses.subject.getValue();
        const json = (available[address] && available[address].json) || {
            address,
            meta: {
                isRecent: undefined,
                whenCreated: Date.now()
            }
        };
        Object.keys(meta).forEach((key) => {
            json.meta[key] = meta[key];
        });
        delete json.meta.isRecent;
        await this.__internal__stores[type]().add(this._forageStore, address, json);
        return json;
    }
    async saveContract(address, meta) {
        return await this.saveAddress(address, meta, 'contract');
    }
    async saveRecent(address) {
        const available = this.addresses.subject.getValue();
        if (!available[address]) {
            await this.addresses.add(this._forageStore, address, {
                address,
                meta: {
                    genesisHash: this.genesisHash,
                    isRecent: true,
                    whenCreated: Date.now()
                }
            });
        }
        return this.addresses.subject.getValue()[address];
    }
}
