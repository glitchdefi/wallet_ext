import { Dispatch } from 'redux';
import { slice } from './reducer';
import { slice as appSlice } from '../application/reducer';

import { sendMessage } from '../../scripts/lib/messages';
import { MessageTypes } from 'types';
import { WalletState } from 'types/WalletState';

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
  (password: string) => async (dispatch: Dispatch<any>) => {
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
        dispatch(actions.setUnlockWrongPassword(state.isWrongPassword));
      } else {
        dispatch(actions.seedPhrasesLoaded(state?.seedPhrase));
        dispatch(actions.setIsLocked(state?.wallet?.isLocked));
      }
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
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
      console.log(error);
      // Handle Error
    }
  };

export const restoreWalletAction =
  (seedPhrase: string, password: string) => async (dispatch: Dispatch<any>) => {
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
    } catch (error) {
      // Handle Error
    } finally {
      dispatch(applicationActions.setIsLoadingApp(false));
    }
  };

export const clearIsWrongUnlockWallet = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.setUnlockWrongPassword(false));
};

const setWalletState = (wallet: WalletState) => (dispatch: Dispatch<any>) => {
  try {
    const { isInitialized, isLocked, identities, accounts, selectedAddress } =
      wallet || {};

    dispatch(actions.setIsInitialized(isInitialized));
    dispatch(actions.setIsLocked(isLocked));
    dispatch(actions.setIdentities(identities));
    dispatch(actions.setSelectedAddress(selectedAddress));
    dispatch(actions.setAccounts(accounts));
  } catch (error) {
    // Handle Error
  }
};
