import { createTestKeyring } from '@polkadot/keyring';
import { isBoolean, isNumber, isString } from '@polkadot/util';
import { accounts } from './observable/accounts.js';
import { addresses } from './observable/addresses.js';
import { contracts } from './observable/contracts.js';
import { env } from './observable/env.js';
import { ForageStorage } from './stores/index.js';
export class Base {
    constructor() {
        this._genesisHashAdd = [];
        this.decodeAddress = (key, ignoreChecksum, ss58Format) => {
            return this.keyring.decodeAddress(key, ignoreChecksum, ss58Format);
        };
        this.encodeAddress = (key, ss58Format) => {
            return this.keyring.encodeAddress(key, ss58Format);
        };
        this.__internal__accounts = accounts;
        this.__internal__addresses = addresses;
        this.__internal__contracts = contracts;
        this.__internal__isEthereum = false;
        this._forageStore = new ForageStorage('keyring', {});
    }
    get accounts() {
        return this.__internal__accounts;
    }
    get addresses() {
        return this.__internal__addresses;
    }
    get contracts() {
        return this.__internal__contracts;
    }
    get isEthereum() {
        return this.__internal__isEthereum;
    }
    get keyring() {
        if (this.__internal__keyring) {
            return this.__internal__keyring;
        }
        throw new Error('Keyring should be initialised via \'loadAll\' before use');
    }
    get genesisHash() {
        return this._genesisHash;
    }
    get genesisHashes() {
        return this._genesisHash
            ? [this._genesisHash, ...this._genesisHashAdd]
            : [...this._genesisHashAdd];
    }
    getPair(address) {
        return this.keyring.getPair(address);
    }
    getPairs() {
        return this.keyring.getPairs().filter((pair) => env.isDevelopment() || pair.meta.isTesting !== true);
    }
    isAvailable(_address) {
        const accountsValue = this.accounts.subject.getValue();
        const addressesValue = this.addresses.subject.getValue();
        const contractsValue = this.contracts.subject.getValue();
        const address = isString(_address)
            ? _address
            : this.encodeAddress(_address);
        return !accountsValue[address] && !addressesValue[address] && !contractsValue[address];
    }
    isPassValid(password) {
        return password.length > 0;
    }
    setSS58Format(ss58Format) {
        if (this.__internal__keyring && isNumber(ss58Format)) {
            this.__internal__keyring.setSS58Format(ss58Format);
        }
    }
    setDevMode(isDevelopment) {
        env.set(isDevelopment);
    }
    async initKeyring(options) {
        const keyring = createTestKeyring(options, true);
        if (isBoolean(options.isDevelopment)) {
            this.setDevMode(options.isDevelopment);
        }
        // set Ethereum state
        this.__internal__isEthereum = keyring.type === 'ethereum';
        this.__internal__keyring = keyring;
        this._genesisHash = options.genesisHash && (isString(options.genesisHash)
            ? options.genesisHash.toString()
            : options.genesisHash.toHex());
        this._genesisHashAdd = options.genesisHashAdd || [];
        this._forageStore = this._forageStore;
        await this.addAccountPairs();
    }
    async addAccountPairs() {
        this.keyring
            .getPairs()
            .forEach(async ({ address, meta }) => {
            await this.accounts.add(this._forageStore, address, { address, meta });
        });
    }
    addTimestamp(pair) {
        if (!pair.meta.whenCreated) {
            pair.setMeta({ whenCreated: Date.now() });
        }
    }
}