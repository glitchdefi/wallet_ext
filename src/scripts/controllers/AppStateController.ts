import { RootState } from 'types';
import { SettingState } from 'types/SettingsState';
import { TransactionsState } from 'types/TransactionsState';
import { WalletState } from 'types/WalletState';
import { ExtensionStore } from '../lib/localStore';

import { ResponseWallet } from '../types';

export class AppStateController {
  store: RootState;
  localStore: ExtensionStore;
  defaultState: RootState;

  constructor(opts: { initialState?: RootState }) {
    const { initialState } = opts;

    const defaultState: RootState = {
      application: {
        activeTabHomePage: 0,
        isLoading: false,
      },
      wallet: {
        isInitialized: 'none',
        isLocked: false,
        accounts: {},
        selectedAddress: null,
        firstAddress: null,
      },
      transactions: {},
      settings: {
        locale: 'en',
        currency: 'usd',
        autoLock: {
          openTime: new Date().getTime(),
          duration: 60000,
        },
      },
    };

    this.localStore = new ExtensionStore();
    this.defaultState = defaultState;

    this.localStore.set({ ...defaultState, ...initialState }).then((store) => {
      this.store = store;
    });
  }

  async getState(): Promise<RootState> {
    return await this.localStore.getAllStorageData();
  }

  async getDefaultState(): Promise<RootState> {
    return this.defaultState;
  }

  async setDefaultState(): Promise<object> {
    await this.localStore.set({ ...this.defaultState });
    return { ...this.defaultState };
  }

  async getWalletState(): Promise<WalletState> {
    return await this.localStore.get('wallet');
  }

  async getTransactionsState(): Promise<TransactionsState> {
    return await this.localStore.get('transactions');
  }

  async getSettingsState(): Promise<SettingState> {
    return await this.localStore.get('settings');
  }

  async setEncryptKey(encryptKey: string): Promise<void> {
    await this.localStore.set({ encryptKey });
  }

  async getEncryptKey(): Promise<string> {
    return await this.localStore.get('encryptKey');
  }

  async setKeyAccounts(encryptPK: string): Promise<void> {
    const oldKeys = await this.getKeyAccounts();
    const keyAccounts = oldKeys.push(encryptPK);

    await this.localStore.set({ keyAccounts });
  }

  async getKeyAccounts(): Promise<string[]> {
    return await this.localStore.get('keyAccounts');
  }

  async getSelectedAddress(): Promise<string> {
    return (await this.getWalletState()).selectedAddress;
  }

  async getFirstAddress(): Promise<string> {
    return (await this.getWalletState()).firstAddress;
  }

  async getParentAddress(): Promise<string> {
    return (await this.getWalletState()).parentAddress;
  }

  async getAccounts(): Promise<WalletState['accounts']> {
    return (await this.getWalletState()).accounts;
  }

  async updateState(
    key: 'wallet' | 'transactions' | 'settings',
    obj: WalletState | ResponseWallet | TransactionsState | SettingState
  ): Promise<any> {
    const oldState = await this.getState();
    const response = (await this.localStore.set({
      [key]: {
        ...oldState[key],
        ...obj,
      },
    })) as {
      wallet: WalletState | ResponseWallet | TransactionsState | SettingState;
    };

    return response[key];
  }
}
