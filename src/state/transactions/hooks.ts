import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types';
import { slice } from './reducer';
import { useToast } from 'hooks/useToast';
import { fetchTransactionsAction, setIsFetchingTransactions } from './actions';
import { useSelectedAddress } from 'state/wallet/hooks';

const useTransactionSelector = () =>
  useSelector((state: RootState) => {
    return state.transactions;
  });

export const useTransactionsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useIsTransferSuccess = () => {
  const { isTransferSuccess } = useTransactionSelector();
  return { isTransferSuccess };
};

export const useTransactions = (filter: {
  pageIndex: number;
  pageSize: number;
  txStatus: number;
  txType: number;
  startTime: number;
  endTime: number;
}) => {
  const dispatch = useDispatch();
  const { toastError } = useToast();
  const { isFetchingTransactions, transactions, transactionsError } =
    useTransactionSelector();
  const { selectedAddress } = useSelectedAddress();
  const { pageIndex, pageSize, txStatus, txType, startTime, endTime } = filter;

  useEffect(() => {
    dispatch(setIsFetchingTransactions());

    setTimeout(() => {
      dispatch(
        fetchTransactionsAction({
          pageIndex,
          pageSize,
          txStatus,
          txType,
          startTime,
          endTime,
        })
      );
    }, 200);
  }, [dispatch, selectedAddress, txStatus, txType, startTime, endTime]);

  useEffect(() => {
    if (transactionsError) {
      toastError('Error', transactionsError?.message);
    }
  }, [transactionsError]);

  return { isFetchingTransactions, transactions };
};
