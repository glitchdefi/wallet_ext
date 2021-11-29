import log from 'loglevel';
import axios from 'axios';
import moment from 'moment';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';
import { GlitchTest } from '../lib/web3/GlitchTest';

// Types
import { RootState } from 'types';
import { getAvatar } from 'utils/drawAvatar';
import { decryptMessage } from 'utils/strings';

log.setDefaultLevel('debug');
export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;
  glitchTest: GlitchTest;

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.glitchTest = new GlitchTest();
    this.appStateController = new AppStateController({ initialState });
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  async createAccount(
    seed: string,
    name: string,
    password: string
  ): Promise<object> {
    try {
      const { mnemonicEncrypted, json } = await this.glitchTest.createAccount(
        seed,
        name,
        password
      );

      const { address, meta } = json as unknown as {
        address: string;
        meta?: {
          name: string;
          avatar: string;
          whenCreated: number;
        };
      };

      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'pending',
        isLocked: true,
        selectedAddress: address,
        firstAddress: address,
        isBackUp: false,
        accounts: {
          [address]: {
            address,
            balance: 0,
            name: meta.name,
            avatar: meta.avatar,
            whenCreated: meta.whenCreated,
            seed: mnemonicEncrypted,
          },
        },
      });

      return newState;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   *
   */
  async createAccountCompleted(): Promise<object> {
    try {
      const addressSelected =
        await this.appStateController.getAddressSelected();
      const oldAccounts = await this.appStateController.getAccounts();
      const balance = await this.glitchTest.getBalance(addressSelected);

      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'completed',
        isLocked: false,
        isBackUp: true,
        accounts: {
          [addressSelected]: {
            ...oldAccounts[addressSelected],
            balance,
          },
        },
      });

      return newState;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   * @param password
   */
  async createNewWallet(password?: string): Promise<object> {
    return null;
  }

  /**
   *
   * @param password
   */
  async createWalletCompleted(): Promise<object> {
    try {
      const addressSelected =
        await this.appStateController.getAddressSelected();
      const oldAccounts = await this.appStateController.getAccounts();
      const balance = await this.glitchTest.getBalance(addressSelected);

      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'completed',
        isLocked: false,
        isBackUp: true,
        accounts: {
          [addressSelected]: {
            ...oldAccounts[addressSelected],
            balance,
          },
        },
      });

      return newState;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   * @returns
   */
  async lockWallet() {
    const newState = await this.appStateController.updateState('wallet', {
      isLocked: true,
    });

    return {
      ...newState,
    };
  }

  /**
   *
   * @returns
   */
  async unlockWallet(password?: string) {
    try {
      let state = {};
      const firstAddress = await this.appStateController.getFirstAddress();
      const settings = await this.appStateController.getSettingsState();
      const isValid = this.glitchTest.unlockAccount(password, firstAddress);

      const newState = await this.appStateController.updateState('wallet', {
        ...state,
        isLocked: !isValid,
      });

      if (isValid) {
        // Reset open time
        await this.appStateController.updateState('settings', {
          autoLock: {
            ...settings.autoLock,
            openTime: new Date().getTime(),
          },
        });
      }

      return {
        ...newState,
        isWrongPassword: !isValid,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   * @returns
   */
  async backupWallet() {
    const newState = await this.appStateController.updateState('wallet', {
      isBackUp: true,
      isInitialized: 'completed',
    });

    return {
      ...newState,
    };
  }

  async restoreWallet(
    seed?: string,
    name?: string,
    password?: string
  ): Promise<object> {
    const { mnemonicEncrypted, json } = await this.glitchTest.createAccount(
      seed,
      name,
      password
    );

    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        avatar: string;
        whenCreated: number;
      };
    };

    const balance = this.glitchTest.getBalance(address);

    try {
      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'completed',
        isLocked: false,
        selectedAddress: address,
        firstAddress: address,
        isBackUp: true,
        accounts: {
          [address]: {
            address: address,
            balance,
            name: meta.name,
            avatar: meta.avatar,
            seed: mnemonicEncrypted,
            whenCreated: meta.whenCreated,
          },
        },
      });

      await this.setAutoLockTimer({
        openTime: new Date().getTime(),
        duration: null,
      });

      return newState;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   * @param password
   */
  async logoutWallet(password?: string): Promise<object> {
    try {
      const firstAddress = await this.appStateController.getFirstAddress();
      const isValid = this.glitchTest.unlockAccount(password, firstAddress);

      if (isValid) {
        await this.appStateController.setDefaultState();
      }

      return {
        isWrongPassword: !isValid,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *
   * @param password
   */
  async showSeedPhrase(password?: string): Promise<object> {
    try {
      const fistAddress = await this.appStateController.getFirstAddress();
      const currentAddress = await this.appStateController.getAddressSelected();
      const isValid = this.glitchTest.unlockAccount(password, fistAddress);

      if (isValid) {
        const oldAccounts = await this.appStateController.getAccounts();
        const currentAccount = oldAccounts[currentAddress];
        const { seed } = currentAccount;
        const decryptSeed = await decryptMessage(seed.encrypted, seed.secret);

        return {
          isWrongPassword: false,
          seedPhrases: decryptSeed,
        };
      }

      return {
        isWrongPassword: true,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  //=============================================================================
  // ACCOUNT METHODS
  //=============================================================================

  /**
   *  Add new account
   * @returns
   */
  async addNewAccount(name?: string): Promise<object> {
    try {
      const { mnemonicEncrypted, json } = await this.glitchTest.createAccount(
        null,
        name,
        null
      );

      const { address, meta } = json as unknown as {
        address: string;
        meta?: {
          name: string;
          avatar: string;
          whenCreated: number;
        };
      };

      const oldAccounts = await this.appStateController.getAccounts();
      const balance = await this.glitchTest.getBalance(address);

      const newState = await this.appStateController.updateState('wallet', {
        selectedAddress: address,
        accounts: {
          [address]: {
            name: meta.name,
            address: address,
            avatar: meta.avatar,
            balance,
            seed: mnemonicEncrypted,
            whenCreated: meta.whenCreated,
          },
          ...oldAccounts,
        },
      });

      return { ...newState };
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Change account
   * @returns
   */
  async changeAccount(address?: string): Promise<object> {
    try {
      const oldAccounts = await this.appStateController.getAccounts();
      const balance = await this.glitchTest.getBalance(address);

      oldAccounts[address].balance = balance;

      const newState = await this.appStateController.updateState('wallet', {
        selectedAddress: address,
        accounts: {
          ...oldAccounts,
        },
      });

      return { ...newState };
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Import account
   * @returns
   */
  async importAccount(name?: string, privateKey?: string): Promise<object> {
    try {
      const { mnemonicEncrypted, json } = await this.glitchTest.createAccount(
        privateKey,
        name,
        null
      );

      const { address, meta } = json as unknown as {
        address: string;
        meta?: {
          name: string;
          avatar: string;
          whenCreated: number;
        };
      };

      const oldAccounts = await this.appStateController.getAccounts();
      const balance = await this.glitchTest.getBalance(address);

      const newState = await this.appStateController.updateState('wallet', {
        selectedAddress: address,
        accounts: {
          [address]: {
            name: meta.name,
            address: address,
            avatar: meta.avatar,
            balance,
            seed: mnemonicEncrypted,
            whenCreated: meta.whenCreated,
          },
          ...oldAccounts,
        },
      });

      return { ...newState };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *  Show current account private key from password
   * @param password - current password
   * @returns { isWrongPassword?: boolean; privateKey?: string }
   */
  async showPrivateKeysAccount(
    password?: string
  ): Promise<{ isWrongPassword?: boolean; privateKey?: string }> {
    try {
      const firstAddress = await this.appStateController.getFirstAddress();
      const currentAddress = await this.appStateController.getAddressSelected();
      const isValid = this.glitchTest.unlockAccount(password, firstAddress);

      // Password correct
      if (isValid) {
        const oldAccounts = await this.appStateController.getAccounts();
        const currentAccount = oldAccounts[currentAddress];
        const { seed } = currentAccount;
        const decryptSeed = (await decryptMessage(
          seed.encrypted,
          seed.secret
        )) as string;
        const privateKey = this.glitchTest.getPrivateKeyFromSeed(decryptSeed);

        return {
          isWrongPassword: false,
          privateKey,
        };
      }

      return {
        isWrongPassword: true,
        privateKey: null,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *  Change account
   * @returns
   */
  async changeAccountName(name?: string): Promise<object> {
    try {
      const oldAccounts = await this.appStateController.getAccounts();
      const address = await this.appStateController.getAddressSelected();

      this.glitchTest.editAccount(name, address);
      oldAccounts[address].name = name;

      const newState = await this.appStateController.updateState('wallet', {
        accounts: {
          ...oldAccounts,
        },
      });

      return { ...newState };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  /**
   *  Transfer token
   * @returns
   */
  async transfer(
    password?: string,
    toAddress?: string,
    amount?: any
  ): Promise<object> {
    try {
      const firstAddress = await this.appStateController.getFirstAddress();
      const currentAddress = await this.appStateController.getAddressSelected();
      const isValid = this.glitchTest.unlockAccount(password, firstAddress);

      if (isValid) {
        this.glitchTest.unlockAccount('', currentAddress);
        await this.glitchTest.transfer(currentAddress, toAddress, amount);

        return {
          isWrongPassword: false,
          isTransferSuccess: true,
        };
      }

      return {
        isWrongPassword: true,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async getTokenPrice(tokenName?: string, currency?: string): Promise<object> {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=${currency}`
      );
      const priceUsd = res?.data[tokenName]?.usd;

      await this.appStateController.updateState('wallet', {
        priceUsd,
      });

      return { price: priceUsd };
    } catch (error) {
      log.info('getTokenPriceError', error);
    }
  }

  async getBalance(): Promise<object> {
    const oldAccounts = await this.appStateController.getAccounts();
    const addressSelected = await this.appStateController.getAddressSelected();
    const balance = await this.glitchTest.getBalance(addressSelected);

    oldAccounts[addressSelected].balance = balance;

    const newState = await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });

    return { ...newState };
  }

  async getTransactionHistory(params: {
    pageIndex: number;
    pageSize: number;
    txStatus: number;
    txType: number;
    startTime: number;
    endTime: number;
  }): Promise<object> {
    const { pageIndex, pageSize, txStatus, txType, startTime, endTime } =
      params || {};
    const address = await this.appStateController.getAddressSelected();

    const dateParams =
      startTime && endTime
        ? `&start_time=${startTime}&end_time=${endTime}`
        : '';

    try {
      const res = await axios.get(
        `https://api-testnet.glitch.finance/address/${address}/tx?page_index=${pageIndex}&page_size=${pageSize}&txStatus=${txStatus}&txType=${txType}${dateParams}`
      );

      return res?.data;
    } catch (error) {
      log.info('getTransactionHistoryError', error);
    }
  }

  //=============================================================================
  // SETTINGS METHODS
  //=============================================================================
  /**
   *
   * @returns
   */
  async setAutoLockTimer(autoLock?: {
    openTime?: number;
    duration?: number;
  }): Promise<object> {
    try {
      const { openTime, duration } = autoLock || {};
      const settings = await this.appStateController.getSettingsState();

      const newState = await this.appStateController.updateState('settings', {
        autoLock: {
          openTime,
          duration: duration || settings.autoLock.duration,
        },
      });

      return { ...newState };
    } catch (error) {
      throw error;
    }
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async setDefaultAppState(): Promise<object> {
    return await this.appStateController.setDefaultState();
  }
}
