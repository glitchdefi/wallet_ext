import React, { createContext, useCallback, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import {
  RequestAccountChange,
  RequestAccountCreate,
  RequestAccountImport,
  RequestWalletCreate,
  RequestWalletRestore,
  RequestAccountEdit,
  ResponseWallet,
  RequestAccountClaimEvmBalance,
  RequestIsEvmClaimed,
} from 'scripts/types';
import {
  backupWallet,
  changeAccount,
  createAccount,
  createWallet,
  createWalletCompleted,
  editAccount,
  forgetAccount,
  getAccountBalance,
  getAuthList,
  importAccount,
  lockWallet,
  logoutWallet,
  removeAuthorization,
  resetAppState,
  restoreWallet,
  unlockWallet,
  setNetwork,
  claimEvmAccountBalance,
  isEvmClaimed,
  updateAccountAvatar,
} from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';
import { useSettings } from 'contexts/SettingsContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import { useAuthorizeReq } from 'contexts/AuthorizeReqContext/hooks';
import { getAvatar } from 'utils/drawAvatar';

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
  onClaimEvmBalance?: (request: RequestAccountClaimEvmBalance) => void;
  checkIsEvmClaimed?: (request: RequestIsEvmClaimed) => Promise<boolean>;
};

export const WalletContext = createContext<WalletContextType>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  const { toastSuccess } = useToast();
  const { setSettingsCtx } = useSettings();
  const { setAppLoading, onSetActiveTabHomePage } = useApplication();
  const { authRequests } = useAuthorizeReq();
  const [wallet, setWallet] = useState<ResponseWallet>();

  const onCreateWallet = useCallback((request: RequestWalletCreate) => {
    createWallet(request).then(() => {
      updateAccountAvatar({ avatar: getAvatar() }).then(setWallet);
    });
  }, []);

  const onCreateWalletCompleted = useCallback((history: any) => {
    setAppLoading(true);

    createWalletCompleted()
      .then(setWallet)
      .finally(() => {
        toastSuccess(null, 'Success! Your wallet has been created!');
        setAppLoading(false);
        history.push('/');
      });
  }, []);

  const onRestoreWallet = useCallback(
    async (request: RequestWalletRestore, history: any) => {
      setAppLoading(true);

      // Forget account
      if (!isEmpty(wallet?.accounts)) {
        for (const key of Object.keys(wallet.accounts)) {
          await forgetAccount({ address: key });
        }
      }

      // Remove connected dapps
      getAuthList().then(async ({ list }) => {
        if (list) {
          for (const key of Object.keys(list)) {
            await removeAuthorization(list[key].url);
          }
        }
      });

      restoreWallet(request)
        .then(() => {
          updateAccountAvatar({ avatar: getAvatar() }).then(setWallet);
        })
        .finally(() => {
          toastSuccess(
            null,
            'Congrats! Your wallet has been restored successfully.'
          );
          setAppLoading(false);
          history.push('/');
        });
    },
    [wallet, authRequests]
  );

  const onLockWallet = useCallback((history: any) => {
    lockWallet()
      .then(setWallet)
      .finally(() => history.push('/'));
  }, []);

  const onUnlockWallet = useCallback((history: any) => {
    setAppLoading(true);

    unlockWallet()
      .then(setWallet)
      .finally(() => {
        setAppLoading(false);
        history.push('/');
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
        history.push('/');
      });
  }, []);

  const onLogoutWallet = useCallback(
    async (history: any) => {
      setAppLoading(true);

      // Forget account
      if (!isEmpty(wallet?.accounts)) {
        for (const key of Object.keys(wallet.accounts)) {
          await forgetAccount({ address: key });
        }
      }

      // Remove connected dapps
      getAuthList().then(async ({ list }) => {
        if (list) {
          for (const key of Object.keys(list)) {
            await removeAuthorization(list[key].url);
          }
        }
      });

      // Remove data store
      logoutWallet()
        .then(async (data) => {
          const { wallet, settings } = data;
          await setNetwork({ network: settings.network });
          setWallet(wallet);
          setSettingsCtx(settings);
          onSetActiveTabHomePage(0);
        })
        .finally(() => {
          setAppLoading(false);
          history.push('/');
        });
    },
    [wallet, authRequests]
  );

  const onCreateAccount = useCallback(
    (request: RequestAccountCreate, history: any) => {
      setAppLoading(true);

      setTimeout(() => {
        createAccount(request)
          .then(() => {
            updateAccountAvatar({ avatar: getAvatar() }).then(setWallet);
          })
          .finally(() => {
            setAppLoading(false);
            history.push('/');
          });
      }, 200);
    },
    []
  );

  const onImportAccount = useCallback(
    (request: RequestAccountImport, history: any) => {
      setAppLoading(true);

      setTimeout(() => {
        importAccount(request)
          .then(() => {
            updateAccountAvatar({ avatar: getAvatar() }).then(setWallet);
          })
          .finally(() => {
            setAppLoading(false);
            history.push('/');
          });
      }, 200);
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

  const onClaimEvmBalance = useCallback(
    (request: RequestAccountClaimEvmBalance) => {
      claimEvmAccountBalance(request);
    },
    []
  );

  const checkIsEvmClaimed = useCallback(
    async (request: RequestIsEvmClaimed): Promise<boolean> => {
      return await isEvmClaimed(request);
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
        onClaimEvmBalance,
        checkIsEvmClaimed,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
