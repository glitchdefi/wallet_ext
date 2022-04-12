import React, { createContext, useCallback, useState } from 'react';
import { Routes } from 'constants/routes';
import {
  RequestAccountChange,
  RequestAccountCreate,
  RequestAccountImport,
  RequestWalletCreate,
  RequestWalletRestore,
  RequestAccountEdit,
  ResponseWallet,
} from 'scripts/types';
import {
  backupWallet,
  changeAccount,
  createAccount,
  createWallet,
  createWalletCompleted,
  editAccount,
  getAccountBalance,
  importAccount,
  lockWallet,
  logoutWallet,
  resetAppState,
  restoreWallet,
  unlockWallet,
} from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';
import { useSettings } from 'contexts/SettingsContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';

export type WalletContextType = {
  walletCtx?: ResponseWallet | undefined;
  setWalletCtx?: (wallet: ResponseWallet) => void;
  onCreateWallet?: (request: RequestWalletCreate) => void;
  onRestoreWallet?: (request: RequestWalletRestore, history: any) => void;
  onCreateAccount?: (request: RequestAccountCreate, history: any) => void;
  onLockWallet?: (history: any) => void;
  onUnlockWallet?: (history: any) => void;
  onLogoutWallet?: (history: any) => void;
  onBackupWallet?: (history: any) => void;
  onGetAccountBalance?: () => void;
  onImportAccount?: (request: RequestAccountImport, history: any) => void;
  onChangeAccount?: (request: RequestAccountChange) => void;
  onEditAccount?: (request: RequestAccountEdit) => void;
  onCreateWalletCompleted?: (history: any) => void;
  onResetAppState?: () => void;
};

export const WalletContext = createContext<WalletContextType>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  const { toastSuccess } = useToast();
  const { setSettingsCtx } = useSettings();
  const { setAppLoading, onSetActiveTabHomePage } = useApplication();
  const [wallet, setWallet] = useState<ResponseWallet>();

  const onCreateWallet = useCallback((request: RequestWalletCreate) => {
    createWallet(request).then(setWallet);
  }, []);

  const onCreateWalletCompleted = useCallback((history: any) => {
    setAppLoading(true);

    createWalletCompleted()
      .then(setWallet)
      .finally(() => {
        toastSuccess(null, 'Success! Your wallet has been created!');
        setAppLoading(false);
        history.push(Routes.home);
      });
  }, []);

  const onRestoreWallet = useCallback(
    (request: RequestWalletRestore, history: any) => {
      setAppLoading(true);

      restoreWallet(request)
        .then(setWallet)
        .finally(() => {
          toastSuccess(
            null,
            'Congrats! Your wallet has been restored successfully.'
          );
          setAppLoading(false);
          history.push(Routes.home);
        });
    },
    []
  );

  const onLockWallet = useCallback((history: any) => {
    lockWallet()
      .then(setWallet)
      .finally(() => history.push(Routes.unlock));
  }, []);

  const onUnlockWallet = useCallback((history: any) => {
    setAppLoading(true);

    unlockWallet()
      .then(setWallet)
      .finally(() => {
        setAppLoading(false);
        history.push(Routes.home);
      });
  }, []);

  const onBackupWallet = useCallback((history: any) => {
    setAppLoading(true);

    backupWallet()
      .then(setWallet)
      .finally(() => {
        toastSuccess(
          null,
          'Congrats! Your wallet has been backed up successfully.'
        );
        setAppLoading(false);
        history.push(Routes.home);
      });
  }, []);

  const onLogoutWallet = useCallback((history: any) => {
    setAppLoading(true);

    logoutWallet()
      .then((data) => {
        const { wallet, settings } = data;
        setWallet(wallet);
        setSettingsCtx(settings);
        onSetActiveTabHomePage(0);
      })
      .finally(() => {
        setAppLoading(false);
        history.push(Routes.welcome);
      });
  }, []);

  const onCreateAccount = useCallback(
    (request: RequestAccountCreate, history: any) => {
      setAppLoading(true);

      createAccount(request)
        .then(setWallet)
        .finally(() => {
          setAppLoading(false);
          history.push(Routes.home);
        });
    },
    []
  );

  const onImportAccount = useCallback(
    (request: RequestAccountImport, history: any) => {
      setAppLoading(true);

      importAccount(request)
        .then(setWallet)
        .finally(() => {
          setAppLoading(false);
          history.push(Routes.home);
        });
    },
    []
  );

  const onChangeAccount = useCallback((request: RequestAccountChange) => {
    setAppLoading(true);

    changeAccount(request)
      .then(setWallet)
      .finally(() => {
        setAppLoading(false);
      });
  }, []);

  const onEditAccount = useCallback((request: RequestAccountEdit) => {
    editAccount(request).then(setWallet);
  }, []);

  const onGetAccountBalance = useCallback(() => {
    getAccountBalance().then(setWallet);
  }, [wallet]);

  const onResetAppState = useCallback(() => {
    resetAppState().then((data: any) => {
      setWallet(data?.wallet);
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletCtx: wallet,
        setWalletCtx: setWallet,
        onCreateWallet,
        onCreateWalletCompleted,
        onRestoreWallet,
        onBackupWallet,
        onCreateAccount,
        onChangeAccount,
        onImportAccount,
        onGetAccountBalance,
        onEditAccount,
        onLockWallet,
        onUnlockWallet,
        onLogoutWallet,
        onResetAppState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
