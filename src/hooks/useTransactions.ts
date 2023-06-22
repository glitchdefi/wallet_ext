import { useEffect, useState } from 'react';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useNetwork } from 'contexts/SettingsContext/hooks';
import { RequestTransactionsGet } from 'scripts/types';
import { useFetchTransactions } from './useFetchTransactions';

export const useTransactions = (request: RequestTransactionsGet) => {
  const { pageIndex, pageSize, txStatus, txType, startTime, endTime } =
    request || {};
  const { walletCtx } = useWallet();
  const currentNetwork = useNetwork();
  const { selectedAddress } = walletCtx || {};
  const [transactions, setTransactions] = useState<any[]>([]);
  const [hasInternet, setHasInternet] = useState<boolean>(true);

  const { isFetching, fetchTransactions } = useFetchTransactions();

  useEffect(() => {
    if (hasInternet && navigator.onLine) {
      fetchTransactions({
        page_index: pageIndex,
        page_size: pageSize,
        txStatus,
        txType,
        start_time: startTime,
        end_time: endTime,
      }).then((res) => {
        setTransactions(res?.data?.data);
      });
    } else {
      setTransactions([]);
    }
  }, [
    selectedAddress,
    currentNetwork,
    txStatus,
    txType,
    startTime,
    endTime,
    hasInternet,
  ]);

  useEffect(() => {
    addEventListener('offline', () => setHasInternet(false));
    addEventListener('online', () => setHasInternet(true));

    return () => {
      removeEventListener('online', () => setHasInternet(true));
      removeEventListener('offline', () => setHasInternet(false));
    };
  }, []);

  return { isLoading: isFetching, transactions };
};
