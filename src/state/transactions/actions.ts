import { Dispatch } from 'redux';
import { slice } from './reducer';
import { sendMessage } from '../../scripts/lib/messages';
import { MessageTypes } from 'types';

const actions = slice.actions;

export const setIsFetchingTransactions =
  () => async (dispatch: Dispatch<any>) => {
    dispatch(actions.setIsFetchingTransactions(true));
  };

export const fetchTransactionsAction =
  ({ pageIndex, pageSize, txStatus, txType }) =>
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
