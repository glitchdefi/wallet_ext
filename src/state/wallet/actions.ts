import BN from 'bn.js';
import { Dispatch } from 'redux';
import { slice } from './reducer';
import { slice as appSlice } from '../application/reducer';

import { sendMessage } from '../../scripts/lib/messages';
import { MessageTypes } from 'types';
import { WalletState } from 'types/WalletState';
import { Routes } from 'constants/routes';

const actions = slice.actions;
const applicationActions = appSlice.actions;

export const createWalletAction =
  (password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_CREATE_WALLET,
        payload: {
          password,
        },
      });

      if (data?.state) {
        const { state } = data;
        dispatch(actions.seedPhrasesLoaded(state?.seedPhrases));
        dispatch(setWalletState(state));
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const createCompletedAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(applicationActions.setIsLoadingApp(true));

    const data = await sendMessage({
      type: MessageTypes.BG_WALLET_CREATE_WALLET_COMPLETED,
    });

    if (data?.state) {
      const { wallet } = data.state;
      dispatch(setWalletState(wallet));
    }
  } catch (error) {
    // Handle Error
  } finally {
    dispatch(applicationActions.setIsLoadingApp(false));
  }
};

export const unlockWalletAction =
  (password: string, history: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_UNLOCK_WALLET,
        payload: {
          password,
        },
      });

      const { state } = data || {};

      if (state?.isWrongPassword) {
        dispatch(actions.setWrongPassword(state.isWrongPassword));
      } else {
        dispatch(actions.setIsLocked(state?.wallet?.isLocked));
        history.push(Routes.home);
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const lockWalletAction =
  (history: any) => async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_LOCK_WALLET,
      });

      const { state } = data || {};

      if (state?.wallet) {
        dispatch(setWalletState(state.wallet));
        history.push(Routes.unlock);
      }
    } catch (error) {
      // Handle Error
    }
  };

export const checkIsValidSeedPhraseAction =
  (seedPhrase: string) => async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_CHECK_IS_VALID_SEED_PHRASE,
        payload: {
          seedPhrase,
        },
      });

      const { state } = data || {};
      dispatch(actions.setIsValidSeedPhrase(state?.isValid));
    } catch (error) {
      // Handle Error
    }
  };

export const restoreWalletAction =
  (seedPhrase: string, password: string, history: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_RESTORE_WALLET,
        payload: {
          seedPhrase,
          password,
        },
      });

      const { state } = data || {};
      dispatch(setWalletState(state?.wallet));
      history.push(Routes.home);
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const logoutWalletAction =
  (password: string, history: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_LOGOUT_WALLET,
        payload: {
          password,
        },
      });

      const { state } = data || {};

      if (state?.isWrongPassword) {
        dispatch(actions.setWrongPassword(state.isWrongPassword));
      } else {
        dispatch(setWalletState(state?.wallet));
        history.push(Routes.welcome);
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const backupWalletAction =
  (history: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_BACK_UP_WALLET,
      });

      const { wallet } = data?.state || {};

      if (wallet) {
        dispatch(actions.setIsInitialized(wallet.isInitialized));
        dispatch(actions.setIsBackUp(wallet.isBackUp));
        history.push(Routes.home);
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const showSeedPhraseAction =
  (password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_SHOW_SEED_PHARES,
        payload: {
          password,
        },
      });

      const { state } = data || {};

      dispatch(actions.setWrongPassword(state?.isWrongPassword));
      dispatch(actions.seedPhrasesLoaded(state?.seedPhrase));
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const getBalanceAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const data = await sendMessage({
      type: MessageTypes.BG_WALLET_GET_BALANCE,
    });

    const { wallet } = data?.state || {};
    dispatch(setWalletState(wallet));
  } catch (error) {
    // Handle Error
  }
};

export const getTokenPriceAction =
  (tokenName: string, currency: string) => async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_GET_TOKEN_PRICE,
        payload: {
          tokenName,
          currency,
        },
      });

      const { price } = data?.state || {};

      dispatch(actions.setTokenPrices(price));
    } catch (error) {
      // Handle Error
    }
  };

export const checkIsValidAddressAction =
  (fromAddress?: string, toAddress?: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_CHECK_IS_VALID_ADDRESS,
        payload: {
          fromAddress,
          toAddress,
        },
      });

      const { isValid } = data?.state || {};

      dispatch(actions.setIsValidAddress(isValid));
    } catch (error) {
      // Handle Error
    }
  };

export const clearSeedPhrase = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.seedPhrasesLoaded(''));
};

export const clearIsWrongPassword = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.setWrongPassword(false));
};

export const addNewAccountAction =
  (name: string, history: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_ACCOUNT_ADD_ACCOUNT,
        payload: {
          name,
        },
      });

      if (data?.state) {
        dispatch(setWalletState(data.state.wallet));
        history.push(Routes.home);
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const changeAccountAction =
  (address: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_ACCOUNT_CHANGE_ACCOUNT,
        payload: {
          address,
        },
      });

      if (data?.state) {
        dispatch(setWalletState(data.state.wallet));
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const importAccountAction =
  (name: string, privateKey: string, history: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_ACCOUNT_IMPORT_ACCOUNT,
        payload: {
          name,
          privateKey,
        },
      });

      if (data?.state) {
        const { wallet, invalidPrivateKey } = data?.state || {};

        dispatch(actions.setIsInvalidPrivateKey(invalidPrivateKey));

        if (wallet) {
          dispatch(setWalletState(wallet));
          history.push(Routes.home);
        }
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const showPrivateKeysAction =
  (password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_ACCOUNT_SHOW_PRIVATE_KEYS,
        payload: {
          password,
        },
      });

      if (data?.state) {
        const { isWrongPassword, privateKey } = data?.state || {};
        dispatch(actions.setWrongPassword(isWrongPassword));
        dispatch(actions.setShowPrivateKey(privateKey));
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const transferAction =
  (password: string, toAddress: string, amount: BN) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(applicationActions.setIsLoadingApp(true));

      const data = await sendMessage({
        type: MessageTypes.BG_WALLET_TRANSFER_TOKEN,
        payload: {
          password,
          toAddress,
          amount,
        },
      });

      const { isWrongPassword } = data?.state;

      if (isWrongPassword) {
        dispatch(actions.setWrongPassword(isWrongPassword));
      } else {
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const changeAccountNameAction =
  (name: string) => async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_ACCOUNT_CHANGE_ACCOUNT_NAME,
        payload: {
          name,
        },
      });

      if (data?.state?.wallet) {
        dispatch(setWalletState(data?.state?.wallet));
      }
    } catch (error) {
      // Handle Error
    }
  };

export const clearIsInvalidPrivateKey = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.setIsInvalidPrivateKey(false));
};

export const clearShowPrivateKey = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.setShowPrivateKey(''));
};

const setWalletState = (wallet: WalletState) => (dispatch: Dispatch<any>) => {
  try {
    const { isInitialized, isLocked, accounts, selectedAddress, isBackUp } =
      wallet || {};

    dispatch(actions.setIsInitialized(isInitialized));
    dispatch(actions.setIsLocked(isLocked));
    dispatch(actions.setSelectedAddress(selectedAddress));
    dispatch(actions.setAccounts(accounts));
    dispatch(actions.setIsBackUp(isBackUp));
  } catch (error) {
    // Handle Error
  }
};
