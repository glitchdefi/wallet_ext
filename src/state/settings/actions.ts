import { Dispatch } from 'redux';
import { slice } from './reducer';
import { sendMessage } from '../../scripts/lib/messages';
import { MessageTypes } from 'types';

const { actions } = slice;

export const setAutoLockTimerAction =
  (openTime?: number, duration?: number) => async (dispatch: Dispatch<any>) => {
    try {
      const data = await sendMessage({
        type: MessageTypes.BG_SETTINGS_SET_AUTO_LOCK_TIMER,
        payload: {
          openTime,
          duration,
        },
      });

      const { settings } = data?.state || {};
      dispatch(actions.setAutoLock(settings?.autoLock));
    } catch (error) {
      // Handle Error
    }
  };
