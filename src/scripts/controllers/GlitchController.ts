import log from 'loglevel';
import axios from 'axios';
import moment from 'moment';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { RootState } from 'types';

log.setDefaultLevel('debug');
export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;
  memStore: {};

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.appStateController = new AppStateController({ initialState });
    this.memStore = {};
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  /**
   *
   * @returns Generate 12 mnemonic phrases
   */
  createSeedPhrases(): string {
    return this.glitchWeb3.createSeedPhrases();
  }

  /**
   *
   * @param password
   */
  async createNewWallet(password?: string): Promise<object> {
    try {
      const seedPhrases = this.createSeedPhrases();
      const wallet = this.glitchWeb3.createNewWallet(seedPhrases);
      this.glitchWeb3.importAccountToWeb3(wallet?.privateKey);

      const encryptKey = await this.glitchWeb3.encrypt(seedPhrases, password);
      const encryptPrivateKey = await this.glitchWeb3.encrypt(
        wallet?.privateKey,
        wallet?.address
      );

      // Update to store
      await this.appStateController.setEncryptKey(encryptKey);

      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'pending',
        isLocked: true,
        selectedAddress: wallet.address,
        isBackUp: false,
        accounts: {
          [wallet.address]: {
            address: wallet.address,
            balance: 0,
            name: 'Account 1',
            avatar: null,
            privateKey: encryptPrivateKey,
            createdAt: moment().valueOf(),
          },
        },
      });

      return {
        ...newState,
        seedPhrases,
      };
    } catch (error) {
      throw error;
    }
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
      const balance = await this.glitchWeb3.getBalance(addressSelected);

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
    } catch (error) {
      throw error;
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
    let state = {};
    const encryptKey = await this.appStateController.getEncryptKey();

    if (encryptKey) {
      const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);

      const newState = await this.appStateController.updateState('wallet', {
        ...state,
        isLocked: false,
      });

      return {
        ...newState,
        isWrongPassword: !seedPhrase,
      };
    } else {
      throw Error('Encrypt key not found');
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

  /**
   *
   * @param password
   */
  async restoreWallet(seedPhrase?: string, password?: string): Promise<object> {
    try {
      const wallet = this.glitchWeb3.createNewWallet(seedPhrase);
      this.glitchWeb3.importAccountToWeb3(wallet?.privateKey);

      const encryptKey = await this.glitchWeb3.encrypt(seedPhrase, password);
      const encryptPrivateKey = await this.glitchWeb3.encrypt(
        wallet?.privateKey,
        wallet?.address
      );
      const balance = await this.glitchWeb3.getBalance(wallet?.address);

      // Update to store
      await this.appStateController.setEncryptKey(encryptKey);

      const newState = await this.appStateController.updateState('wallet', {
        isInitialized: 'completed',
        isLocked: false,
        selectedAddress: wallet.address,
        isBackUp: true,
        accounts: {
          [wallet.address]: {
            address: wallet.address,
            balance,
            name: 'Account 1',
            avatar: null,
            privateKey: encryptPrivateKey,
            createdAt: moment().valueOf(),
          },
        },
      });

      return {
        ...newState,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param password
   */
  async logoutWallet(password?: string): Promise<object> {
    try {
      const encryptKey = await this.appStateController.getEncryptKey();

      if (encryptKey) {
        const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);
        if (seedPhrase) await this.appStateController.setDefaultState();

        return {
          isWrongPassword: !seedPhrase,
        };
      } else {
        throw Error('Encrypt key not found');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param password
   */
  async showSeedPhrase(password?: string): Promise<object> {
    try {
      const encryptKey = await this.appStateController.getEncryptKey();

      if (encryptKey) {
        const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);

        return {
          isWrongPassword: !seedPhrase,
          seedPhrase,
        };
      } else {
        throw Error('Encrypt key not found');
      }
    } catch (error) {
      throw error;
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
      const account = await this.glitchWeb3.addNewAccount();
      this.glitchWeb3.importAccountToWeb3(account?.privateKey);

      const encryptPrivateKey = await this.glitchWeb3.encrypt(
        account.privateKey,
        account.address
      );

      const oldAccounts = await this.appStateController.getAccounts();

      const newState = await this.appStateController.updateState('wallet', {
        selectedAddress: account.address,
        accounts: {
          [account.address]: {
            name,
            address: account.address,
            avatar: null,
            balance: 0,
            privateKey: encryptPrivateKey,
            createdAt: moment().valueOf(),
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
      const balance = await this.glitchWeb3.getBalance(address);

      const privateKey = await this.glitchWeb3.decrypt(
        oldAccounts[address].privateKey,
        address
      );

      this.glitchWeb3.importAccountToWeb3(privateKey);

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
      const address = await this.glitchWeb3.getAddressFromPrivateKey(
        privateKey
      );
      let newState = {};

      if (address) {
        const oldAccounts = await this.appStateController.getAccounts();
        const balance = await this.glitchWeb3.getBalance(address);
        const encryptPrivateKey = await this.glitchWeb3.encrypt(
          privateKey,
          address
        );

        this.glitchWeb3.importAccountToWeb3(privateKey);

        newState = await this.appStateController.updateState('wallet', {
          selectedAddress: address,
          accounts: {
            [address]: {
              name,
              address,
              balance,
              avatar: null,
              privateKey: encryptPrivateKey,
              createdAt: moment().valueOf(),
            },
            ...oldAccounts,
          },
        });
      }

      return { invalidPrivateKey: !address, ...newState };
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Change account
   * @returns
   */
  async showPrivateKeysAccount(password?: string): Promise<object> {
    try {
      const encryptKey = await this.appStateController.getEncryptKey();

      if (encryptKey) {
        const oldAccounts = await this.appStateController.getAccounts();

        const addressSelected =
          await this.appStateController.getAddressSelected();

        const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);

        const privateKey = await this.glitchWeb3.decrypt(
          oldAccounts[addressSelected].privateKey,
          addressSelected
        );

        return {
          isWrongPassword: !seedPhrase,
          privateKey: seedPhrase ? privateKey : null,
        };
      } else {
        throw Error('Encrypt key not found');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Change account
   * @returns
   */
  async changeAccountName(name?: string): Promise<object> {
    try {
      const oldAccounts = await this.appStateController.getAccounts();
      const addressSelected =
        await this.appStateController.getAddressSelected();

      oldAccounts[addressSelected].name = name;

      const newState = await this.appStateController.updateState('wallet', {
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
   *  Transfer token
   * @returns
   */
  async transfer(
    password?: string,
    toAddress?: string,
    amount?: any
  ): Promise<object> {
    try {
      const encryptKey = await this.appStateController.getEncryptKey();

      if (encryptKey) {
        const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);

        if (seedPhrase) {
          const transaction = await this.glitchWeb3.transferToken(
            toAddress,
            amount
          );

          return {
            isWrongPassword: false,
            isTransferSuccess: true,
            transaction,
          };
        }

        return {
          isWrongPassword: true,
        };
      } else {
        throw Error('Encrypt key not found');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @returns
   */
  checkIsValidSeedPhrase(seedPhrase?: string): { isValid?: boolean } {
    const isValid = this.glitchWeb3.isValidSeedPhrase(seedPhrase);
    return { isValid };
  }

  /**
   *
   * @returns
   */
  checkIsValidAddress(
    fromAddress?: string,
    toAddress?: string
  ): { isValid?: boolean } {
    const isValid =
      this.glitchWeb3.isValidAddress(toAddress) && fromAddress !== toAddress;
    return { isValid };
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
    const balance = await this.glitchWeb3.getBalance(addressSelected);

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
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async getAppState() {
    return await this.appStateController.getState();
  }

  async setDefaultAppState(): Promise<object> {
    return await this.appStateController.setDefaultState();
  }
}
