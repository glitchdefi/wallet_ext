import { Dispatch } from 'redux';
import { slice } from './reducer';

import { MessageTypes } from 'types';
import { sendMessage } from '../../scripts/lib/messages';

const actions = slice.actions;

export const createSeedWordsAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await sendMessage({
      type: MessageTypes.BG_WALLET_CREATE_SEED_WORDS,
    });

    dispatch(actions.seedPhrasesLoaded(res?.seedPhrases));
  } catch (error) {
    // Handle Error
  }
};

export const createWalletAction =
  (password: string) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await sendMessage({
        type: MessageTypes.BG_WALLET_CREATE_WALLET,
      });

      dispatch(actions.seedPhrasesLoaded(res?.seedPhrases));
    } catch (error) {
      // Handle Error
    }
  };
