import * as bip39 from 'bip39';
import log from 'loglevel';
import HDKey from 'hdkey';
import web3Utils from 'web3-utils';
import BN from 'bn.js';
import GlitchCommon from '@glitchdefi/common';
import { GlitchWeb3 as GlitchWeb3Base } from '@glitchdefi/web3';
import { GlitchNetwork } from '../../../constants/networks';

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
  createSeedWords(): string {
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
   *
   * @param password
   * @returns walletStore
   */
  encode(password?: string): any {
    // TODO
  }

  /**
   *
   * @param password
   * @param address
   */
  decode(password?: string, address?: string) {
    // TODO
  }

  /**
   * Get account balance.
   * @param {string} address address of the account.
   * @returns {number | string} account balance.
   */
  async getBalance(address: string): Promise<number | string> {
    try {
      const result = await this.glitchWeb3.getBalance(address);
      return web3Utils.fromWei(new BN(result.balance));
    } catch (error) {
      return 0;
    }
  }

  /**
   *
   * @param privatekey
   * @returns
   */
  importAccountToWeb3(privatekey: string) {
    this.glitchWeb3.wallet.importAccount(privatekey);
  }

  /**
   *
   * @param address
   * @returns
   */
  isValidAddress(address: string): boolean {
    return GlitchCommon.codec.isBankAddress(address);
  }
}
