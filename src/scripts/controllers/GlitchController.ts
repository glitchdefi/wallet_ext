import log from 'loglevel';
import axios from 'axios';
import secrets from 'secrets';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { RootState } from 'types';
import { decryptMessage } from 'utils/strings';
import {
  RequestWalletCreate,
  RequestWalletValidate,
  ResponseWallet,
} from '../types';

log.setDefaultLevel('debug');
export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.appStateController = new AppStateController({ initialState });
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  async createAccount(request: RequestWalletCreate): Promise<ResponseWallet> {
    const data = await this.glitchWeb3.createAccount(request);
    const { mnemonicEncrypted, json } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        avatar: string;
        whenCreated: number;
      };
    };

    return await this.appStateController.updateState('wallet', {
      isInitialized: 'pending',
      isLocked: true,
      isBackUp: false,
      seed: null,
      parentAddress: address,
      selectedAddress: address,
      accounts: {
        [address]: {
          address,
          name: meta.name,
          avatar: meta.avatar,
          whenCreated: meta.whenCreated,
          balance: {},
          seed: mnemonicEncrypted,
        },
      },
    });
  }

  async createWalletCompleted(): Promise<ResponseWallet> {
    const selectedAddress = await this.appStateController.getSelectedAddress();
    const oldAccounts = await this.appStateController.getAccounts();

    return await this.appStateController.updateState('wallet', {
      isInitialized: 'completed',
      isLocked: false,
      isBackUp: true,
      accounts: {
        [selectedAddress]: {
          ...oldAccounts[selectedAddress],
        },
      },
    });
  }

  async restoreWallet(request: RequestWalletCreate): Promise<ResponseWallet> {
    const data = await this.glitchWeb3.createAccount(request);
    const { mnemonicEncrypted, json } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        avatar: string;
        whenCreated: number;
      };
    };

    await this.setAutoLockTimer({
      openTime: new Date().getTime(),
      duration: 60000,
    });

    return await this.appStateController.updateState('wallet', {
      isInitialized: 'completed',
      isLocked: false,
      isBackUp: true,
      selectedAddress: address,
      parentAddress: address,
      seed: null,
      accounts: {
        [address]: {
          address: address,
          balance: {},
          name: meta.name,
          avatar: meta.avatar,
          whenCreated: meta.whenCreated,
          seed: mnemonicEncrypted,
        },
      },
    });
  }

  async lockWallet(): Promise<ResponseWallet> {
    return await this.appStateController.updateState('wallet', {
      isLocked: true,
    });
  }

  async unlockWallet(): Promise<ResponseWallet> {
    const settings = await this.appStateController.getSettingsState();

    // Reset open time
    await this.appStateController.updateState('settings', {
      autoLock: {
        ...settings.autoLock,
        openTime: new Date().getTime(),
      },
    });

    return await this.appStateController.updateState('wallet', {
      isLocked: false,
    });
  }

  async backupWallet(): Promise<ResponseWallet> {
    return await this.appStateController.updateState('wallet', {
      isBackUp: true,
      isInitialized: 'completed',
    });
  }

  async walletValidate({ password }: RequestWalletValidate): Promise<boolean> {
    //TODO -> change parent address
    const parentAddress = await this.appStateController.getParentAddress();
    return this.glitchWeb3.unlockAccount(password, parentAddress);
  }

  async logoutWallet(password?: string): Promise<object> {
    try {
      const firstAddress = await this.appStateController.getParentAddress();
      const isValid = this.glitchWeb3.unlockAccount(password, firstAddress);

      if (isValid) {
        const state = await this.appStateController.setDefaultState();
        return { ...state };
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
      const fistAddress = await this.appStateController.getParentAddress();
      const isValid = this.glitchWeb3.unlockAccount(password, fistAddress);

      if (isValid) {
        const oldAccounts = await this.appStateController.getAccounts();
        const firstAccount = oldAccounts[fistAddress];
        const { seed } = firstAccount;
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
    // try {
    //   const { mnemonicEncrypted, json } = await this.glitchWeb3.createAccount(
    //     null,
    //     name,
    //     null
    //   );
    //   const { address, meta } = json as unknown as {
    //     address: string;
    //     meta?: {
    //       name: string;
    //       avatar: string;
    //       whenCreated: number;
    //     };
    //   };
    //   const oldAccounts = await this.appStateController.getAccounts();
    //   const newState = await this.appStateController.updateState('wallet', {
    //     selectedAddress: address,
    //     accounts: {
    //       [address]: {
    //         name: meta.name,
    //         address: address,
    //         avatar: meta.avatar,
    //         balance: '0',
    //         seed: mnemonicEncrypted,
    //         whenCreated: meta.whenCreated,
    //       },
    //       ...oldAccounts,
    //     },
    //   });
    //   return { ...newState };
    // } catch (error) {
    //   throw error;
    // }
    return {};
  }

  /**
   *  Change account
   * @returns
   */
  async changeAccount(address?: string): Promise<object> {
    try {
      const oldAccounts = await this.appStateController.getAccounts();

      oldAccounts[address].balance = '0';
      oldAccounts[address].reservedBalance = '0';

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
    // try {
    //   const { mnemonicEncrypted, json } = await this.glitchWeb3.createAccount(
    //     privateKey,
    //     name,
    //     null
    //   );

    //   const { address, meta } = json as unknown as {
    //     address: string;
    //     meta?: {
    //       name: string;
    //       avatar: string;
    //       whenCreated: number;
    //     };
    //   };

    //   const oldAccounts = await this.appStateController.getAccounts();

    //   // Account exists
    //   if (oldAccounts[address]) {
    //     return {
    //       privateKeyExists: true,
    //     };
    //   }

    //   const newState = await this.appStateController.updateState('wallet', {
    //     selectedAddress: address,
    //     accounts: {
    //       [address]: {
    //         name: meta.name,
    //         address: address,
    //         avatar: meta.avatar,
    //         balance: '0',
    //         seed: mnemonicEncrypted,
    //         whenCreated: meta.whenCreated,
    //       },
    //       ...oldAccounts,
    //     },
    //   });

    //   return { ...newState };
    // } catch (e) {
    //   throw new Error((e as Error).message);
    // }
    return {};
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
      const firstAddress = await this.appStateController.getParentAddress();
      const currentAddress = await this.appStateController.getSelectedAddress();
      const isValid = this.glitchWeb3.unlockAccount(password, firstAddress);

      // Password correct
      if (isValid) {
        const oldAccounts = await this.appStateController.getAccounts();
        const currentAccount = oldAccounts[currentAddress];
        const { seed } = currentAccount;
        const decryptSeed = (await decryptMessage(
          seed.encrypted,
          seed.secret
        )) as string;
        const privateKey = this.glitchWeb3.getPrivateKeyFromSeed(decryptSeed);

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
      const address = await this.appStateController.getSelectedAddress();

      this.glitchWeb3.editAccount(name, address);
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
    amount?: any,
    onFailedCb?: (msg: string) => void,
    onSuccessCb?: () => void,
    onWrongPassCb?: () => void
  ): Promise<void> {
    try {
      const firstAddress = await this.appStateController.getParentAddress();
      const currentAddress = await this.appStateController.getSelectedAddress();
      const isValid = this.glitchWeb3.unlockAccount(password, firstAddress);

      if (isValid) {
        this.glitchWeb3.unlockAccount('', currentAddress);

        await this.glitchWeb3.transfer(
          currentAddress,
          toAddress,
          amount,
          onFailedCb,
          onSuccessCb
        );
      } else {
        onWrongPassCb();
      }
    } catch (e: any) {
      log.info('transfer', e);
      const msg =
        e.message ===
        '1010: Invalid Transaction: Inability to pay some fees , e.g. account balance too low'
          ? 'Insufficient balance for transaction fee'
          : e.message;
      onFailedCb(msg);
    }
  }

  /**
   *  gets the fee estimation via RPC.
   * @returns
   */
  async getEstimateFee(toAddress?: string, amount?: any): Promise<string> {
    try {
      const currentAddress = await this.appStateController.getSelectedAddress();
      const fee = await this.glitchWeb3.getEstimateFee(
        currentAddress,
        toAddress,
        amount
      );

      return fee;
    } catch (e: any) {
      log.info('getEstimateFeeError', e);
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
    const addressSelected = await this.appStateController.getSelectedAddress();
    const { freeBalance, reservedBalance } = await this.glitchWeb3.getBalance(
      addressSelected
    );

    oldAccounts[addressSelected].balance = freeBalance;
    oldAccounts[addressSelected].reservedBalance = reservedBalance;

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
    const address = await this.appStateController.getSelectedAddress();

    const dateParams =
      startTime && endTime
        ? `&start_time=${startTime}&end_time=${endTime}`
        : '';

    try {
      const res = await axios.get(
        `${secrets.baseApiUrl}/address/${address}/tx?page_index=${pageIndex}&page_size=${pageSize}&txStatus=${txStatus}&txType=${txType}${dateParams}`
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

      const newState = await this.appStateController.updateState('settings', {
        autoLock: {
          openTime,
          duration,
        },
      });

      return { ...newState };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async setDefaultAppState(): Promise<object> {
    return await this.appStateController.setDefaultState();
  }
}
