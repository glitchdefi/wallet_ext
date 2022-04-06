import React, { createContext, useCallback, useState } from 'react';
import { Routes } from 'constants/routes';
import {
  RequestAccountCreate,
  RequestAccountImport,
  RequestWalletCreate,
  RequestWalletRestore,
  ResponseWallet,
} from 'scripts/types';
import {
  createAccount,
  createWallet,
  createWalletCompleted,
  importAccount,
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
  onCreateAccount?: (request: RequestAccountCreate, history: any) => void;
  onUnlockWallet?: (history: any) => void;
  onImportAccount?: (request: RequestAccountImport, history: any) => void;
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

  const onUnlockWallet = useCallback((history: any) => {
    unlockWallet()
      .then(setWallet)
      .finally(() => history.push(Routes.home));
  }, []);

  const onCreateAccount = useCallback(
    (request: RequestAccountCreate, history: any) => {
      setLoading(true);

      createAccount(request)
        .then(setWallet)
        .finally(() => {
          setLoading(false);
          history.push(Routes.home);
        });
    },
    []
  );

  const onImportAccount = useCallback(
    (request: RequestAccountImport, history: any) => {
      setLoading(true);

      importAccount(request)
        .then(setWallet)
        .finally(() => {
          setLoading(false);
          history.push(Routes.home);
        });
    },
    []
  );

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
        onCreateAccount,
        onImportAccount,
        onLockWallet,
        onUnlockWallet,
        onResetAppState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
