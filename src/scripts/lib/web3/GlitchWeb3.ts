import GlitchCommon from '@glitchdefi/common';
import bip39 from 'bip39';
import HDKey from 'hdkey';
import web3Utils from 'web3-utils';
import BN from 'bn.js';
import { GlitchWeb3 as GlitchWeb3Base } from '@glitchdefi/web3';
import { GlitchNetwork } from '../../../constants/networks';

class GlitchWeb3 {
  public glitchWeb3: GlitchWeb3Base;
  private static instance: GlitchWeb3;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    const accountWeb3 = new GlitchWeb3Base(GlitchNetwork[0].networks[0].host);
    this.glitchWeb3 = accountWeb3;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): GlitchWeb3 {
    if (!GlitchWeb3.instance) {
      GlitchWeb3.instance = new GlitchWeb3();
    }

    return GlitchWeb3.instance;
  }

  public getWeb3Glitch() {
    if (this.glitchWeb3) {
      GlitchWeb3.getInstance();
    }
    return this.glitchWeb3;
  }

  /**
   * Get account info.
   * @param mnemonic
   * @returns
   */
  public getAccount(mnemonic: string): {
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
   * @returns
   */
  public createNewVaultAndKeychain(password: string) {
    const mnemonic = bip39.generateMnemonic(128);
    return this.getAccount(mnemonic);
  }

  /**
   * Get account balance.
   * @param {string} address address of the account.
   * @returns {number | string} account balance.
   */
  public async getBalance(address: string): Promise<number | string> {
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
  public importAccountToWeb3(privatekey: string) {
    this.glitchWeb3.wallet.importAccount(privatekey);
  }

  /**
   *
   * @param address
   * @returns
   */
  public isValidAddress(address: string): boolean {
    return GlitchCommon.codec.isBankAddress(address);
  }
}

export const glitchWeb3 = GlitchWeb3.getInstance();
