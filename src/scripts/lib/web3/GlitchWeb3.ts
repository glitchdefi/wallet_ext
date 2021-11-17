import * as bip39 from 'bip39';
import log from 'loglevel';
import HDKey from 'hdkey';
import web3Utils from 'web3-utils';
import { findIndex } from 'lodash';
import BN from 'bn.js';
import encryptor from '@metamask/browser-passworder';
import GlitchCommon from '@glitchdefi/common';
import { GlitchWeb3 as GlitchWeb3Base } from '@glitchdefi/web3';
import { GlitchNetwork } from '../../../constants/networks';
import { GlitchToken } from '../../../constants/tokens';

log.setDefaultLevel('debug');
export class GlitchWeb3 {
  glitchWeb3: GlitchWeb3Base;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    const connectGlitchNetwork = new GlitchWeb3Base(
      GlitchNetwork[0].networks[0].host
    );
    this.glitchWeb3 = connectGlitchNetwork;

    log.info('Glitch Web3 initialization complete.');
  }

  /**
   *
   * @returns Generate 12 mnemonic phrases
   */
  createSeedPhrases(): string {
    const mnemonic = bip39.generateMnemonic(128);
    return mnemonic;
  }

  /**
   * Create new a wallet
   * @param password
   * @returns
   */
  createNewWallet(mnemonic?: string): {
    mnemonic: string;
    privateKey: string;
    address: string;
  } {
    return this.getWalletByMnemonic(mnemonic);
  }

  /**
   * Get wallet info by mnemonic & seed
   * @param mnemonic
   * @returns Wallet info
   */
  getWalletByMnemonic(mnemonic: string): {
    mnemonic: string;
    privateKey: string;
    address: string;
  } {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);

    const path = 'm/44/60/0/0';
    let index = 0;
    let address: string;
    let privateKey: string;
    let childkey: any;

    do {
      childkey = hdkey.derive(path + index);
      privateKey = GlitchCommon.codec.toKeyString(childkey.privateKey);
      ({ address } = GlitchCommon.ecc.toPubKeyAndAddress(privateKey));
      index += 1;
    } while (!GlitchCommon.codec.isBankAddress(address));

    return { mnemonic, privateKey, address };
  }

  /**
   * Add new account
   * @returns Account info
   */
  async addNewAccount(): Promise<{
    publicKey?: string;
    privateKey?: string;
    address?: string;
  }> {
    const account = await this.glitchWeb3.wallet.createBankAccount();

    if (account) {
      return {
        ...account,
        privateKey: GlitchCommon.codec.toKeyString(account.privateKey),
      };
    }

    return null;
  }

  /**
   * Get address from private key
   * @returns
   */
  async getAddressFromPrivateKey(privateKey: string): Promise<string> {
    if (privateKey.length < GlitchToken.private_key_length) {
      return null;
    } else {
      const { address } = await GlitchCommon.ecc.toPubKeyAndAddress(privateKey);
      return address;
    }
  }

  /**
   *
   * @param seedPhrases
   * @param password
   */
  async encrypt(seedPhrases?: string, password?: any): Promise<string> {
    if (seedPhrases && password) {
      return await encryptor.encrypt(password, seedPhrases);
    } else {
      throw Error('Private key and password is required');
    }
  }

  /**
   *
   * @param encryptKey
   * @param password
   */
  async decrypt(encryptKey?: string, password?: string): Promise<any> {
    try {
      if (typeof encryptKey === 'string' && typeof password === 'string') {
        return await encryptor.decrypt(password, encryptKey);
      }

      throw new Error('Encrypt key or password is not string');
    } catch (error) {
      return null;
    }
  }

  /**
   * Get account balance.
   * @param {string} address address of the account.
   * @returns {string} account balance.
   */
  async getBalance(address: string): Promise<string> {
    try {
      const result = await this.glitchWeb3.getBalance(address);
      return web3Utils.fromWei(new BN(result.balance));
    } catch (error) {
      return '0';
    }
  }

  /**
   *
   * @param privatekey
   * @returns
   */
  importAccountToWeb3(privatekey: string) {
    console.log(
      'Change Account - wallet.importAccount',
      this.glitchWeb3.wallet.importAccount(privatekey)
    );

    this.glitchWeb3.wallet.importAccount(privatekey);
  }

  /**
   *
   * @param address
   * @returns
   */
  isValidAddress(address: string): boolean {
    try {
      if (address.trim().length !== GlitchToken.wallet_address_length) {
        return false;
      }

      return (
        GlitchCommon.ecc.validateAddress(address) &&
        GlitchCommon.codec.isBankAddress(address)
      );
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param fromAddress
   * @param toAddress
   * @param _amount
   * @returns
   */
  async transferToken(
    fromAddress: string,
    toAddress: string,
    _amount: any
  ): Promise<any> {
    try {
      const fee = web3Utils.toWei(GlitchToken.fee.toString());
      const amount = web3Utils.toWei(_amount).toString();

      const result = await this.glitchWeb3.transfer(toAddress, amount, {
        fee,
        from: fromAddress,
      });

      console.log('Transfer success', result);

      return this.getTransactionFromResponse(result);
    } catch (err) {
      log.info('transferToken Error: ', err);
      throw err;
    }
  }

  /**
   *
   * @param response
   * @returns
   */
  getTransactionFromResponse = (response: any): object => {
    const hash = response.hash;
    const height = response.height;
    const from = response.events[0].eventData.from;
    const to = response.events[0].eventData.to;
    let gasused = response.events[0].eventData.gasused;

    let value = response.events[1].eventData.value;
    const method = response.events[1].eventName;
    const timestamp = response.id;

    return {
      timestamp,
      hash,
      height,
      from,
      to,
      gasused: gasused,
      value: value,
      method,
      result_log: 1,
    };
  };

  /**
   *
   * @param mnemonic
   * @returns
   */
  isValidSeedPhrase(seedPhrase: string): boolean {
    const rs =
      seedPhrase &&
      GlitchToken.mnemonic_length.includes(seedPhrase.split(' ').length);
    if (!rs) return false;
    const blankValueIndex = findIndex(seedPhrase.split(' '), (e: any) => {
      return e.trim() === '';
    });

    const validateBip39 = bip39.validateMnemonic(seedPhrase);

    return validateBip39 && blankValueIndex === -1;
  }
}
