import { RootState } from 'types/RootState';
import { SettingState } from 'types/SettingsState';
import { TransactionsState } from 'types/TransactionsState';
import { WalletState } from 'types/WalletState';
import { ExtensionStore } from '../lib/localStore';

export class AppStateController {
  store: RootState;
  localStore: ExtensionStore;

  constructor(opts: { initialState?: RootState }) {
    const { initialState } = opts;

    const defaultState: RootState = {
      wallet: {
        isInitialized: false,
        isUnlocked: false,
        accounts: {},
        selectedAddress: null,
        identities: {},
      },
      transactions: {},
      settings: {
        locale: null,
        currency: 'usd',
      },
    };

    this.localStore = new ExtensionStore();

    this.store = {
      ...defaultState,
    };
  }

  async getState(): Promise<RootState> {
    return this.localStore.getAllStorageData();
  }

  async getWalletState(): Promise<WalletState> {
    return this.localStore.get('wallet');
  }

  async getTransactionsState(): Promise<TransactionsState> {
    return this.localStore.get('transactions');
  }

  async getSettingsState(): Promise<SettingState> {
    return this.localStore.get('settings');
  }
}
