import { useEffect, useState } from 'react';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useNetwork } from 'contexts/SettingsContext/hooks';
import { RequestTransactionsGet } from 'scripts/types';
import { getTransactions } from 'scripts/ui/messaging';

export const useTransactions = (request: RequestTransactionsGet) => {
  const { txStatus, txType, startTime, endTime } = request || {};
  const { walletCtx } = useWallet();
  const currentNetwork = useNetwork();
  const { selectedAddress } = walletCtx || {};
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasInternet, setHasInternet] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    if (hasInternet && navigator.onLine) {
      getTransactions(request)
        .then((data) => {
          setTransactions(data?.data);
        })
        .finally(() => setIsLoading(false));
    } else {
      setTransactions([]);
      setIsLoading(false);
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

  return { isLoading, transactions };
};
