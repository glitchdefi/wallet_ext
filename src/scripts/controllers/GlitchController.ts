import log from 'loglevel';
import axios from 'axios';
import secrets from 'secrets';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { decryptMessage } from 'utils/strings';
import {
  RequestAccountChange,
  RequestAccountCreate,
  RequestAccountEdit,
  RequestAccountImport,
  RequestAccountTransfer,
  RequestAutoLockSet,
  RequestEstimateFeeGet,
  RequestPrivatekeyValidate,
  RequestTokenPriceGet,
  RequestTransactionsGet,
  RequestUpdateWalletStorage,
  RequestWalletCreate,
  RequestWalletValidate,
  ResponseAppStore,
  ResponseSettings,
  ResponseTransactionsGet,
  ResponseWallet,
} from '../types';

log.setDefaultLevel('debug');
export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;

  constructor(otps: { initialState: ResponseAppStore }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.appStateController = new AppStateController({ initialState });
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  async createWallet(request: RequestWalletCreate): Promise<ResponseWallet> {
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
      isBackup: false,
      seed: null,
      parentAddress: address,
      selectedAddress: address,
      accounts: {
        [address]: {
          address,
          name: meta.name,
          avatar: meta.avatar,
          whenCreated: meta.whenCreated,
          balance: { reservedBalance: '0', freeBalance: '0' },
          seed: mnemonicEncrypted,
          allowedUrls: [],
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
      isBackup: true,
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
      isBackup: true,
      selectedAddress: address,
      parentAddress: address,
      seed: null,
      accounts: {
        [address]: {
          address: address,
          balance: { reservedBalance: '0', freeBalance: '0' },
          name: meta.name,
          avatar: meta.avatar,
          whenCreated: meta.whenCreated,
          seed: mnemonicEncrypted,
          allowedUrls: [],
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
      isBackup: true,
      isInitialized: 'completed',
    });
  }

  async logoutWallet(): Promise<ResponseAppStore> {
    return await this.appStateController.setDefaultState();
  }

  async walletValidate({ password }: RequestWalletValidate): Promise<boolean> {
    const parentAddress = await this.appStateController.getParentAddress();
    return this.glitchWeb3.unlockAccount(password, parentAddress);
  }

  async showWalletSeed(): Promise<string> {
    const parentAddress = await this.appStateController.getParentAddress();
    const oldAccounts = await this.appStateController.getAccounts();
    const parentAccount = oldAccounts[parentAddress];

    const { seed } = parentAccount;
    return (await decryptMessage(seed.encrypted, seed.secret)) as string;
  }

  //=============================================================================
  // ACCOUNT METHODS
  //=============================================================================

  async createAccount({ name }: RequestAccountCreate): Promise<ResponseWallet> {
    const data = await this.glitchWeb3.createAccount({
      seed: null,
      name,
      password: null,
    });
    const { mnemonicEncrypted, json } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        avatar: string;
        whenCreated: number;
      };
    };
    const oldAccounts = await this.appStateController.getAccounts();
    return await this.appStateController.updateState('wallet', {
      selectedAddress: address,
      accounts: {
        [address]: {
          name: meta.name,
          address: address,
          avatar: meta.avatar,
          balance: { reservedBalance: '0', freeBalance: '0' },
          seed: mnemonicEncrypted,
          whenCreated: meta.whenCreated,
          allowedUrls: [],
        },
        ...oldAccounts,
      },
    });
  }

  async importAccount({
    name,
    privateKey,
  }: RequestAccountImport): Promise<ResponseWallet> {
    const data = await this.glitchWeb3.createAccount({
      seed: privateKey,
      name,
      password: null,
    });
    const { mnemonicEncrypted, json } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        avatar: string;
        whenCreated: number;
      };
    };
    const oldAccounts = await this.appStateController.getAccounts();

    return await this.appStateController.updateState('wallet', {
      selectedAddress: address,
      accounts: {
        [address]: {
          name: meta.name,
          address: address,
          avatar: meta.avatar,
          balance: { freeBalance: '0', reservedBalance: '0' },
          seed: mnemonicEncrypted,
          whenCreated: meta.whenCreated,
          allowedUrls: [],
        },
        ...oldAccounts,
      },
    });
  }

  async privateKeyValidate({
    privateKey,
  }: RequestPrivatekeyValidate): Promise<boolean> {
    const { json } = await this.glitchWeb3.createAccount({
      seed: privateKey,
      name: '',
      password: null,
    });
    const { address } = json as unknown as {
      address: string;
    };
    const oldAccounts = await this.appStateController.getAccounts();

    return !!oldAccounts[address];
  }

  async changeAccount({
    address,
  }: RequestAccountChange): Promise<ResponseWallet> {
    const oldAccounts = await this.appStateController.getAccounts();

    return await this.appStateController.updateState('wallet', {
      selectedAddress: address,
      accounts: {
        ...oldAccounts,
      },
    });
  }

  async showAccountPrivateKey(): Promise<string> {
    const oldAccounts = await this.appStateController.getAccounts();
    const address = await this.appStateController.getSelectedAddress();
    const currentAccount = oldAccounts[address];

    const { seed } = currentAccount;
    const decryptSeed = (await decryptMessage(
      seed.encrypted,
      seed.secret
    )) as string;
    return this.glitchWeb3.getPrivateKeyFromSeed(decryptSeed);
  }

  async editAccount({ name }: RequestAccountEdit): Promise<ResponseWallet> {
    const oldAccounts = await this.appStateController.getAccounts();
    const address = await this.appStateController.getSelectedAddress();

    this.glitchWeb3.editAccount(name, address);
    oldAccounts[address].name = name;

    return await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });
  }

  async transfer(
    { toAddress, amount }: RequestAccountTransfer,
    onFailedCb?: (msg: string) => void,
    onSuccessCb?: () => void
  ): Promise<void> {
    try {
      const currentAddress = await this.appStateController.getSelectedAddress();
      this.glitchWeb3.unlockAccount('', currentAddress);

      await this.glitchWeb3.transfer(
        currentAddress,
        toAddress,
        amount,
        onFailedCb,
        onSuccessCb
      );
    } catch (e: any) {
      log.info('Transfer error: ', e);
      const msg =
        e.message ===
        '1010: Invalid Transaction: Inability to pay some fees , e.g. account balance too low'
          ? 'Insufficient balance for transaction fee'
          : e.message;
      onFailedCb(msg);
    }
  }

  async getEstimateFee({
    toAddress,
    amount,
  }: RequestEstimateFeeGet): Promise<string> {
    const currentAddress = await this.appStateController.getSelectedAddress();
    return await this.glitchWeb3.getEstimateFee(
      currentAddress,
      toAddress,
      amount
    );
  }

  async getTokenPrice({
    name,
    currency,
  }: RequestTokenPriceGet): Promise<string | number> {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${currency}`
    );
    return res?.data[name]?.usd;
  }

  async getBalance(): Promise<ResponseWallet> {
    const oldAccounts = await this.appStateController.getAccounts();
    const addressSelected = await this.appStateController.getSelectedAddress();
    const { freeBalance, reservedBalance } = await this.glitchWeb3.getBalance(
      addressSelected
    );

    oldAccounts[addressSelected].balance = { freeBalance, reservedBalance };

    return await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });
  }

  async getTransactions(
    request: RequestTransactionsGet
  ): Promise<ResponseTransactionsGet> {
    const { pageIndex, pageSize, txStatus, txType, startTime, endTime } =
      request || {};
    const address = await this.appStateController.getSelectedAddress();

    const dateParams =
      startTime && endTime
        ? `&start_time=${startTime}&end_time=${endTime}`
        : '';

    const res = await axios.get(
      `${secrets.baseApiUrl}/address/${address}/tx?page_index=${pageIndex}&page_size=${pageSize}&txStatus=${txStatus}&txType=${txType}${dateParams}`
    );

    return res?.data;
  }

  //=============================================================================
  // SETTINGS METHODS
  //=============================================================================

  async setAutoLockTimer(
    request: RequestAutoLockSet
  ): Promise<ResponseSettings> {
    return await this.appStateController.updateState('settings', {
      autoLock: request,
    });
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async updateWalletStorage({
    data,
  }: RequestUpdateWalletStorage): Promise<ResponseWallet> {
    return await this.appStateController.updateState('wallet', {
      ...data,
    });
  }

  async setDefaultAppState(): Promise<object> {
    return await this.appStateController.setDefaultState();
  }
}
