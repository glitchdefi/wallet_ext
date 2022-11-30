import log from 'loglevel';
import keyring from '@polkadot/ui-keyring';
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import web3Utils from 'web3-utils';
import Web3 from 'web3';

import { AccountTypes, RequestWalletCreate } from 'scripts/types';
import { AppStateController } from 'scripts/controllers/AppStateController';

import { DEFAULT_TYPE } from 'constants/values';
import { GlitchToken } from 'constants/tokens';
import { GlitchNetwork, GLITCH_EVM_TYPES } from 'constants/networks';

import { getAvatar } from 'utils/drawAvatar';
import {
  isHexSeed,
  messageEncryption,
  privateKeyValidate,
} from 'utils/strings';

log.setDefaultLevel('debug');
export class GlitchWeb3 {
  web3: Web3;
  api: ApiPromise;
  appStateController: AppStateController;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor(appStateController: AppStateController) {
    this.appStateController = appStateController;
    cryptoWaitReady().then(async () => {
      await this.createApi();
      // load all available addresses and accounts
      keyring.loadAll({ ss58Format: 42, type: DEFAULT_TYPE });
    });
  }

  async createApi() {
    try {
      const networkName = await this.appStateController.getNetwork();
      const networkInfo = GlitchNetwork.find((n) => n.key === networkName);

      // Initialise the provider to connect to the local node
      const provider = new WsProvider(networkInfo.wsProvider);

      // Create the API and wait until ready
      const api = await ApiPromise.create({
        provider,
        types: GLITCH_EVM_TYPES,
      });

      this.web3 = new Web3(networkInfo.evmProvider);
      this.api = api;

      log.info('Glitch Wallet initialization complete.');
    } catch (error) {
      log.info('initError', error);
    }
  }

  async createAccount(request: RequestWalletCreate): Promise<{
    mnemonicEncrypted: { encrypted: string; secret: string };
    json: KeyringPair$Json;
    evmAccount: { address: string; encryptedPk: string };
  }> {
    let evmAccount = {
      address: null,
    };
    let encryptedPk = null;
    const { seed, name, password } = request;
    const mnemonic =
      seed?.trim() || mnemonicGenerate(GlitchToken.default_mnemonic_length);

    const { json } = keyring.addUri(mnemonic, password || undefined, {
      avatar: getAvatar(),
      name,
      genesisHash: this.api.genesisHash.toHex(),
    });

    if (isHexSeed(mnemonic)) {
      evmAccount = this.web3.eth.accounts.privateKeyToAccount(mnemonic);
      encryptedPk = this.web3.eth.accounts.encrypt(
        mnemonic,
        evmAccount.address
      );
    } else {
      const privateKey = this.getPrivateKeyFromSeed(mnemonic);
      evmAccount = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      encryptedPk = this.web3.eth.accounts.encrypt(
        privateKey,
        evmAccount.address
      );
    }

    const mnemonicEncrypted = await messageEncryption(mnemonic);

    return {
      mnemonicEncrypted,
      json,
      evmAccount: {
        ...evmAccount,
        encryptedPk: JSON.stringify(encryptedPk),
      },
    };
  }

  editAccount(name: string, address: string) {
    const pair = keyring.getPair(address);

    if (pair) {
      keyring.saveAccountMeta(pair, { ...pair.meta, name });
      return true;
    }

    return false;
  }

  updateAccountGenesisHash() {
    const accounts = keyring.getAccounts();

    accounts.forEach((account) => {
      const { address } = account;
      const pair = keyring.getPair(address);

      if (pair) {
        keyring.saveAccountMeta(pair, {
          ...pair.meta,
          genesisHash: this.api.genesisHash.toHex(),
        });
      }
    });
  }

  unlockAccount(password?: string, address?: string) {
    try {
      const pair = keyring.getPair(address);
      pair.unlock(password);

      return true;
    } catch (error) {
      return false;
    }
  }

  async getBalance(address: string) {
    const { data: balance } = await this.api.query.system.account(address);
    return {
      freeBalance: `${balance.free ? `${balance.free}` : '0'}`,
      reservedBalance: `${balance.reserved ? `${balance.reserved}` : '0'}`,
    };
  }

  async getEstimateFee(
    fromAddress: string,
    toAddress: string,
    _amount: string
  ) {
    try {
      const amount = web3Utils.toWei(_amount).toString();
      const { partialFee } = await this.api.tx.balances
        .transfer(toAddress, amount)
        .paymentInfo(fromAddress);

      return web3Utils.fromWei(partialFee);
    } catch (e: any) {
      log.info('getEstimateFeeError:', e);
      throw new Error((e as Error).message);
    }
  }

  async transfer(
    fromAddress: string,
    toAddress: string,
    _amount: string,
    onFailedCb: (msg: string) => void,
    onSuccessCb: () => void
  ) {
    try {
      // Find the actual keypair in the keyring
      const fromAddressPair = keyring.getPair(fromAddress);
      const amount = web3Utils.toWei(_amount).toString();

      log.info(
        'Sending',
        _amount,
        'from',
        fromAddressPair.address,
        'to',
        toAddress
      );

      await this.api.tx.balances
        .transfer(toAddress, amount)
        .signAndSend(fromAddressPair, ({ dispatchError, isCompleted }) => {
          // status would still be set, but in the case of error we can shortcut
          // to just check it (so an error would indicate InBlock or Finalized)
          if (dispatchError) {
            if (dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = this.api.registry.findMetaError(
                dispatchError.asModule
              );
              const { docs, name, section } = decoded;
              const msg = docs.join(' ');
              const codeError = `${section}.${name}`;

              log.info(`${codeError}: ${msg}`);

              onFailedCb(
                codeError === 'balances.InsufficientBalance'
                  ? 'Insufficient funds'
                  : codeError === 'balances.ExistentialDeposit'
                  ? 'The amount should be larger than 0.0005 GLCH.'
                  : msg
              );
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              log.info('dispatchError', dispatchError.toString());
              onFailedCb(dispatchError.toString());
            }
          }

          if (!dispatchError && isCompleted) {
            log.info('Transfer success');
            onSuccessCb();
          }
        });
    } catch (e: any) {
      log.info('Transfer Error:', e);
      throw new Error((e as Error).message);
    }
  }

  getPrivateKeyFromSeed(seed: string) {
    if (privateKeyValidate(seed)) {
      return seed;
    }

    // Create valid Substrate-compatible seed from mnemonic
    const miniSecret = mnemonicToMiniSecret(seed);
    const { secretKey } = naclKeypairFromSeed(miniSecret);

    return u8aToHex(secretKey.subarray(0, 32));
  }

  async claimEvmAccountBalance(account: AccountTypes): Promise<boolean> {
    try {
      const addressPair = keyring.getPair(account.address);
      const privateKey = this.web3.eth.accounts.decrypt(
        JSON.parse(account.encryptedPk),
        account.evmAddress
      );
      this.web3.eth.accounts.wallet.add(privateKey);
      const signature = await this.web3.eth.sign(
        `glitch evm:${this.web3.utils
          .bytesToHex(
            this.web3.utils.hexToBytes(u8aToHex(addressPair.publicKey))
          )
          .slice(2)}`,
        account.evmAddress
      );
      return new Promise((resolve, reject) => {
        this.api.tx.evmAccounts
          .claimAccount(account.evmAddress, signature)
          .signAndSend(addressPair, async ({ events = [], status }) => {
            if (status.isFinalized) {
              console.log(
                `Time: ${new Date().toLocaleString()} ${
                  account.address
                } has bound with EVM address: ${account.evmAddress}`
              );
              resolve(true);
            }
          });
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  clearAllWeb3WalletAccounts() {
    this.web3.eth.accounts.wallet.clear();
  }
}
