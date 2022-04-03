import React, { createContext, useCallback, useState } from 'react';
import {
  RequestWalletCreate,
  RequestWalletRestore,
  ResponseWallet,
} from 'scripts/types';
import {
  createWallet,
  createWalletCompleted,
  resetAppState,
  restoreWallet,
  unlockWallet,
} from 'scripts/ui/messaging';

export type WalletContextType = {
  loading?: boolean;
  walletCtx?: ResponseWallet | undefined;
  setWalletCtx?: (wallet: ResponseWallet) => void;
  onCreateWallet?: (request: RequestWalletCreate) => void;
  onRestoreWallet?: (request: RequestWalletRestore) => void;
  onUnlockWallet?: () => void;
  onCreateWalletCompleted?: () => void;
  onLockWallet?: () => void;
  onResetAppState?: () => void;
};

export const WalletContext = createContext<WalletContextType>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<ResponseWallet>();

  const onCreateWallet = useCallback((request: RequestWalletCreate) => {
    createWallet(request).then(setWallet);
  }, []);

  const onCreateWalletCompleted = useCallback(() => {
    setLoading(true);

    createWalletCompleted()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  const onRestoreWallet = useCallback((request: RequestWalletRestore) => {
    setLoading(true);

    restoreWallet(request)
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  const onLockWallet = useCallback(() => {}, []);

  const onUnlockWallet = useCallback(() => {
    unlockWallet().then(setWallet);
  }, []);

  const onResetAppState = useCallback(() => {
    resetAppState().then((data: any) => {
      setWallet(data?.wallet);
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        loading,
        walletCtx: wallet,
        setWalletCtx: setWallet,
        onCreateWallet,
        onCreateWalletCompleted,
        onRestoreWallet,
        onLockWallet,
        onUnlockWallet,
        onResetAppState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
