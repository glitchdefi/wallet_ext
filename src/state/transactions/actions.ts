import { Dispatch } from 'redux';
import { slice } from './reducer';
import { sendMessage } from '../../scripts/lib/messages';
import { MessageTypes } from 'types';

const actions = slice.actions;

export const setIsFetchingTransactions =
  (loading?: boolean) => async (dispatch: Dispatch<any>) => {
    dispatch(actions.setIsFetchingTransactions(loading));
  };

export const clearTransactionsAction =
  () => async (dispatch: Dispatch<any>) => {
    dispatch(actions.setTransactions([]));
  };

export const fetchTransactionsAction =
  ({ pageIndex, pageSize, txStatus, txType, startTime, endTime }) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await sendMessage({
        type: MessageTypes.BG_TRANSACTION_GET_TX_LIST,
        payload: {
          params: {
            pageIndex,
            pageSize,
            txStatus,
            txType,
            startTime,
            endTime,
          },
        },
      });

      const { data, total } = res?.state || {};

      dispatch(actions.setTransactions(data));
      dispatch(actions.setTotalTransactions(total));
    } catch (error) {
      dispatch(actions.setTransactionsError(error));
    } finally {
      dispatch(actions.setIsFetchingTransactions(false));
    }
  };
