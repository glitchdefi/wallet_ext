import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { useToast } from 'hooks/useToast';
import {
  clearTransactionsAction,
  fetchTransactionsAction,
  setIsFetchingTransactions,
} from './actions';
import { useSelectedAddress } from 'state/wallet/hooks';

const useTransactionSelector = () =>
  useSelector((state: RootState) => {
    return state.transactions;
  });

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
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    dispatch(setIsFetchingTransactions(true));

    if (hasInternet && navigator.onLine) {
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
    } else {
      dispatch(clearTransactionsAction());
      dispatch(setIsFetchingTransactions(false));
    }
  }, [
    dispatch,
    selectedAddress,
    txStatus,
    txType,
    startTime,
    endTime,
    hasInternet,
  ]);

  useEffect(() => {
    if (transactionsError) {
      const msg =
        transactionsError?.message ===
        'The message port closed before a response was received.'
          ? 'Get transaction list error'
          : transactionsError?.message;
      toastError('Error', msg);
    }
  }, [transactionsError]);

  useEffect(() => {
    addEventListener('offline', () => setHasInternet(false));
    addEventListener('online', () => setHasInternet(true));

    return () => {
      removeEventListener('online', () => setHasInternet(true));
      removeEventListener('offline', () => setHasInternet(false));
    };
  }, []);

  return { isFetchingTransactions, transactions };
};
