import { log } from 'utils/log-config';
import keyring from 'packages/glitch-keyring';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { decryptMessage } from 'utils/strings';
import {
  RequestAccountChange,
  RequestAccountClaimEvmBalance,
  RequestAccountCreate,
  RequestAccountEdit,
  RequestAccountImport,
  RequestAccountTransfer,
  RequestAutoLockSet,
  RequestEstimateFeeGet,
  RequestIsEvmClaimed,
  RequestNetworkSet,
  RequestPrivatekeyValidate,
  RequestUpdateAccountAvatar,
  RequestUpdateWalletStorage,
  RequestWalletCreate,
  RequestWalletValidate,
  ResponseAppStore,
  ResponseSettings,
  ResponseWallet,
} from '../types';
import { DEFAULT_TYPE } from 'constants/values';

export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;

  constructor(otps: { initialState: ResponseAppStore }) {
    const { initialState } = otps;
    this.appStateController = new AppStateController({ initialState });
    this.glitchWeb3 = new GlitchWeb3(this.appStateController);
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  async createWallet(request: RequestWalletCreate): Promise<ResponseWallet> {
    const data = await this.glitchWeb3.createAccount(request);
    const { mnemonicEncrypted, json, evmAccount } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        whenCreated: number;
      };
    };

    this.glitchWeb3.unlockAccount(request.password, address);

    return await this.appStateController.updateState('wallet', {
      isInitialized: 'pending',
      isLocked: true,
      isBackup: false,
      seed: null,
      parentAddress: address,
      parentEvmAddress: evmAccount.address,
      selectedAddress: address,
      accounts: {
        [address]: {
          address,
          evmAddress: evmAccount.address,
          name: meta.name,
          avatar: null,
          whenCreated: meta.whenCreated,
          balance: { reservedBalance: '0', freeBalance: '0' },
          seed: mnemonicEncrypted,
          encryptedPk: evmAccount.encryptedPk,
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
    try {
      const data = await this.glitchWeb3.createAccount(request);
      const { mnemonicEncrypted, json, evmAccount } = data;
      const { address, meta } = json as unknown as {
        address: string;
        meta?: {
          name: string;
          whenCreated: number;
        };
      };

      this.glitchWeb3.unlockAccount(request.password, address);

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
        parentEvmAddress: evmAccount.address,
        seed: null,
        accounts: {
          [address]: {
            address: address,
            evmAddress: evmAccount.address,
            balance: { reservedBalance: '0', freeBalance: '0' },
            name: meta.name,
            avatar: null,
            whenCreated: meta.whenCreated,
            encryptedPk: evmAccount.encryptedPk,
            seed: mnemonicEncrypted,
            allowedUrls: [],
          },
        },
      });
    } catch (error) {
      log.error('restoreWalletError', error);
    }
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
    try {
      const data = await this.glitchWeb3.createAccount({
        seed: null,
        name,
        password: null,
      });
      const { mnemonicEncrypted, json, evmAccount } = data;
      const { address, meta } = json as unknown as {
        address: string;
        meta?: {
          name: string;
          whenCreated: number;
        };
      };
      const oldAccounts = await this.appStateController.getAccounts();

      const wallet = await this.appStateController.updateState('wallet', {
        selectedAddress: address,
        accounts: {
          [address]: {
            name: meta.name,
            address: address,
            evmAddress: evmAccount.address,
            avatar: null,
            balance: { reservedBalance: '0', freeBalance: '0' },
            seed: mnemonicEncrypted,
            whenCreated: meta.whenCreated,
            encryptedPk: evmAccount.encryptedPk,
            allowedUrls: [],
          },
          ...oldAccounts,
        },
      });

      return wallet;
    } catch (error) {
      log.error('createAccountError', error);
    }
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
    const { mnemonicEncrypted, json, evmAccount } = data;
    const { address, meta } = json as unknown as {
      address: string;
      meta?: {
        name: string;
        whenCreated: number;
      };
    };
    const oldAccounts = await this.appStateController.getAccounts();

    const wallet = await this.appStateController.updateState('wallet', {
      selectedAddress: address,
      accounts: {
        [address]: {
          name: meta.name,
          address: address,
          evmAddress: evmAccount.address,
          avatar: null,
          balance: { freeBalance: '0', reservedBalance: '0' },
          seed: mnemonicEncrypted,
          whenCreated: meta.whenCreated,
          encryptedPk: evmAccount.encryptedPk,
          allowedUrls: [],
        },
        ...oldAccounts,
      },
    });

    return wallet;
  }

  async privateKeyValidate({
    privateKey,
  }: RequestPrivatekeyValidate): Promise<boolean> {
    const address = keyring.createFromUri(privateKey, {}, DEFAULT_TYPE).address;
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

    await this.glitchWeb3.editAccount(name, address);
    oldAccounts[address].name = name;

    return await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });
  }

  async updateAccountAvatar({
    avatar,
  }: RequestUpdateAccountAvatar): Promise<ResponseWallet> {
    const oldAccounts = await this.appStateController.getAccounts();
    const address = await this.appStateController.getSelectedAddress();

    oldAccounts[address].avatar = avatar;

    return await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });
  }

  async claimEvmAccount(
    request: RequestAccountClaimEvmBalance
  ): Promise<boolean> {
    const allAccounts = await this.appStateController.getAccounts();
    const currentAccount = allAccounts[request.address];
    this.glitchWeb3.unlockAccount('', request.address);

    return await this.glitchWeb3.claimEvmAccountBalance(currentAccount);
  }

  async isEvmClaimed(request: RequestIsEvmClaimed): Promise<boolean> {
    return await this.glitchWeb3.isEvmClaimed(
      request.substrateAddress,
      request.evmAddress
    );
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
      log.error('Transfer error: ', e);
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

  async getBalance(): Promise<ResponseWallet> {
    const oldAccounts = await this.appStateController.getAccounts();
    const addressSelected = await this.appStateController.getSelectedAddress();

    if (addressSelected) {
      const { freeBalance, reservedBalance } = await this.glitchWeb3.getBalance(
        addressSelected
      );

      oldAccounts[addressSelected].balance = { freeBalance, reservedBalance };
    }

    return await this.appStateController.updateState('wallet', {
      accounts: {
        ...oldAccounts,
      },
    });
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

  async setNetwork({ network }: RequestNetworkSet): Promise<ResponseSettings> {
    const settings = await this.appStateController.updateState('settings', {
      network,
    });
    await this.glitchWeb3.createApi();
    await this.glitchWeb3.updateAccountGenesisHash();

    return settings;
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
