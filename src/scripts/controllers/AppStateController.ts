import { ExtensionStore } from '../lib/localStore';

import { ResponseAppStore, ResponseSettings, ResponseWallet } from '../types';

export class AppStateController {
  store: ResponseAppStore;
  localStore: ExtensionStore;
  defaultState: ResponseAppStore;

  constructor(opts: { initialState?: ResponseAppStore }) {
    const { initialState } = opts;

    const defaultState: ResponseAppStore = {
      wallet: {
        isInitialized: 'none',
        isLocked: false,
        accounts: {},
        selectedAddress: null,
        parentEvmAddress: null,
        parentAddress: null,
      },
      settings: {
        locale: 'en',
        currency: 'usd',
        autoLock: {
          openTime: new Date().getTime(),
          duration: 60000,
        },
        network: 'testnet',
      },
    };

    this.localStore = new ExtensionStore();
    this.defaultState = defaultState;

    this.localStore.set({ ...defaultState, ...initialState }).then((store) => {
      this.store = store as ResponseAppStore;
    });
  }

  async getState(): Promise<ResponseAppStore> {
    return await this.localStore.getAllStorageData();
  }

  async getDefaultState(): Promise<ResponseAppStore> {
    return this.defaultState;
  }

  async setDefaultState(): Promise<ResponseAppStore> {
    await this.localStore.set({ ...this.defaultState });
    return { ...this.defaultState };
  }

  async getWalletState(): Promise<ResponseWallet> {
    return await this.localStore.get('wallet');
  }

  async getSettingsState(): Promise<ResponseSettings> {
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

  async getParentAddress(): Promise<string> {
    return (await this.getWalletState()).parentAddress;
  }

  async getAccounts(): Promise<ResponseWallet['accounts']> {
    return (await this.getWalletState()).accounts;
  }

  async getNetwork(): Promise<ResponseSettings['network']> {
    return (await this.getSettingsState()).network;
  }

  async updateState(
    key: 'wallet' | 'settings',
    obj: ResponseWallet | ResponseSettings
  ): Promise<any> {
    const oldState = await this.getState();
    const response = (await this.localStore.set({
      [key]: {
        ...oldState[key],
        ...obj,
      },
    })) as {
      wallet: ResponseWallet | ResponseSettings;
    };

    return response[key];
  }
}
