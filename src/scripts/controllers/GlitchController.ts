import log from 'loglevel';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { RootState } from 'types';
import { resetIdCounter } from 'react-tabs';

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
        accounts: {
          [wallet.address]: {
            address: wallet.address,
            balance: 0,
            name: 'Account 1',
            avatar: null,
            privateKey: encryptPrivateKey,
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
    const isInitialized = (await this.appStateController.getWalletState())
      .isInitialized;

    if (encryptKey) {
      const seedPhrase = await this.glitchWeb3.decrypt(encryptKey, password);

      const newState = await this.appStateController.updateState('wallet', {
        ...state,
        isLocked: isInitialized === 'completed' ? false : true,
      });

      return {
        ...newState,
        isWrongPassword: !seedPhrase,
        seedPhrase: isInitialized !== 'completed' ? seedPhrase : null,
      };
    } else {
      throw Error('Encrypt key not found');
    }
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
        accounts: {
          [wallet.address]: {
            address: wallet.address,
            balance,
            name: 'Account 1',
            avatar: null,
            privateKey: encryptPrivateKey,
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

  //=============================================================================
  // ACCOUNT METHODS
  //=============================================================================

  /**
   *  Add new account
   * @returns
   */
  async addNewAccount(name?: string): Promise<object> {
    try {
      const account = this.glitchWeb3.addNewAccount();
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

      const newState = await this.appStateController.updateState('wallet', {
        selectedAddress: address,
        accounts: {
          ...oldAccounts,
          [address]: {
            ...oldAccounts[address],
            balance,
          },
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
  async importAccount(name?: string, privateKey?: string): Promise<object> {
    try {
      const address = this.glitchWeb3.getAddressFromPrivateKey(privateKey);
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
   *
   * @returns
   */
  checkIsValidSeedPhrase(seedPhrase?: string): { isValid?: boolean } {
    const isValid = this.glitchWeb3.isValidSeedPhrase(seedPhrase);
    return { isValid };
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async getAppState() {
    return await this.appStateController.getState();
  }
}
