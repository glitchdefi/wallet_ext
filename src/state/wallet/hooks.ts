import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { useToast } from 'hooks/useToast';
import * as actions from './actions';
import { AccountType } from 'types/WalletState';

const useWalletSelector = () =>
  useSelector((state: RootState) => {
    return state.wallet;
  });

export const useIsInitialized = () => {
  const { isInitialized } = useWalletSelector();
  return { isInitialized };
};

export const useWrongPassword = () => {
  const { isWrongPassword } = useWalletSelector();
  return { isWrongPassword };
};

export const useAccount = (): AccountType => {
  const { accounts, selectedAddress, priceUsd } = useWalletSelector();
  if (accounts && selectedAddress) {
    const account = accounts[selectedAddress];
    if (account) {
      return { ...account, totalValue: Number(account.balance) * priceUsd };
    }
  }

  return {
    name: '--',
    address: '--',
    balance: 0,
    avatar: null,
    whenCreated: null,
    totalValue: 0,
    seed: null,
  };
};

export const useSeedPhrase = () => {
  const { seedPhrases } = useWalletSelector();
  return { seedPhrase: seedPhrases };
};

export const useAccounts = () => {
  const { accounts } = useWalletSelector();
  return { accounts, accountLength: Object.entries(accounts).length };
};

export const useSelectedAddress = () => {
  const { selectedAddress } = useWalletSelector();
  return { selectedAddress };
};

export const useShowPrivateKey = () => {
  const { showPrivateKey } = useWalletSelector();
  return { showPrivateKey };
};

export const useIsBackup = () => {
  const { isBackUp } = useWalletSelector();
  return { isBackUp };
};

export const useTokenPrice = () => {
  const { priceUsd } = useWalletSelector();
  return { priceUsd };
};

export const useIsValidAddress = () => {
  const { isValidAddress } = useWalletSelector();
  return { isValidAddress };
};

export const useWallet = () => {
  return useWalletSelector();
};

export const useTransferAction = (): {
  onTransfer: (password: string, toAddress: string, amount: any) => void;
} => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  const onTransfer = useCallback(
    (password: string, toAddress: string, amount: any) => {
      dispatch(
        actions.transferAction(password, toAddress, amount, toast, history)
      );
      dispatch(actions.getBalanceAction());
    },
    [dispatch]
  );

  return {
    onTransfer,
  };
};

/**
 *
 * @returns wallet actions
 */
export const useWalletActionHandlers = (): {
  onUnlockWallet: (password: string) => void;
  onRestoreWallet: (seedPhrase: string, name: string, password: string) => void;
  onLogoutWallet: (password: string) => void;
  onShowSeedPhrase: (password: string) => void;
  onLockWallet: () => void;
  onCreateCompleted: () => void;
  onClearIsWrongPassword: () => void;
  onClearSeedPhrase: () => void;
  onBackupWalletAction: () => void;
  getBalance: () => void;
  onResetState: () => void;
  getTokenPrice: (tokenName: string, currency: string) => void;
} => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  const onLockWallet = useCallback(
    () => dispatch(actions.lockWalletAction(history)),
    [dispatch]
  );

  const onUnlockWallet = useCallback(
    (password: string) =>
      dispatch(actions.unlockWalletAction(password, history)),
    [dispatch]
  );

  const onCreateCompleted = useCallback(
    () => dispatch(actions.createCompletedAction()),
    [dispatch]
  );

  const onClearIsWrongPassword = useCallback(
    () => dispatch(actions.clearIsWrongPassword()),
    [dispatch]
  );

  const onRestoreWallet = useCallback(
    (seedPhrase: string, name: string, password: string) =>
      dispatch(
        actions.restoreWalletAction(seedPhrase, name, password, history, toast)
      ),
    [dispatch]
  );

  const onLogoutWallet = useCallback(
    (password?: string) =>
      dispatch(actions.logoutWalletAction(password, history)),
    [dispatch]
  );

  const onShowSeedPhrase = useCallback(
    (password?: string) => dispatch(actions.showSeedPhraseAction(password)),
    [dispatch]
  );

  const onClearSeedPhrase = useCallback(
    () => dispatch(actions.clearSeedPhrase()),
    [dispatch]
  );

  const onBackupWalletAction = useCallback(
    () => dispatch(actions.backupWalletAction(history, toast)),
    [dispatch]
  );

  const getBalance = useCallback(
    () => dispatch(actions.getBalanceAction()),
    [dispatch]
  );

  const getTokenPrice = useCallback(
    (tokenName: string, currency: string) =>
      dispatch(actions.getTokenPriceAction(tokenName, currency)),
    [dispatch]
  );

  const onResetState = useCallback(
    () => dispatch(actions.resetStateAction(history)),
    [dispatch]
  );

  return {
    onUnlockWallet,
    onCreateCompleted,
    onClearIsWrongPassword,
    onRestoreWallet,
    onLockWallet,
    onLogoutWallet,
    onShowSeedPhrase,
    onClearSeedPhrase,
    onBackupWalletAction,
    getBalance,
    getTokenPrice,
    onResetState,
  };
};

/**
 *
 * @returns account actions
 */
export const useAccountActionHandlers = (): {
  onCreateAccount: (seed: string, name: string, password: string) => void;
  onAddNewAccount: (name: string) => void;
  onChangeAccount: (address: string) => void;
  onImportAccount: (name: string, privateKey: string) => void;
  onShowPrivateKeys: (password: string) => void;
  onClearShowPrivateKey: () => void;
  onChangeAccountName: (name: string) => void;
} => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onCreateAccount = useCallback(
    (seed: string, name: string, password: string) =>
      dispatch(actions.createAccountAction(seed, name, password)),
    [dispatch]
  );

  const onAddNewAccount = useCallback(
    (name: string) => dispatch(actions.addNewAccountAction(name, history)),
    [dispatch]
  );

  const onChangeAccount = useCallback(
    (address: string) => dispatch(actions.changeAccountAction(address)),
    [dispatch]
  );

  const onImportAccount = useCallback(
    (name: string, privateKey: string) =>
      dispatch(actions.importAccountAction(name, privateKey, history)),
    [dispatch]
  );

  const onShowPrivateKeys = useCallback(
    (password: string) => dispatch(actions.showPrivateKeysAction(password)),
    [dispatch]
  );

  const onClearShowPrivateKey = useCallback(
    () => dispatch(actions.clearShowPrivateKey()),
    [dispatch]
  );

  const onChangeAccountName = useCallback(
    (name: string) => dispatch(actions.changeAccountNameAction(name)),
    [dispatch]
  );

  return {
    onCreateAccount,
    onAddNewAccount,
    onChangeAccount,
    onImportAccount,
    onShowPrivateKeys,
    onClearShowPrivateKey,
    onChangeAccountName,
  };
};

export const useStepTitleDesc = (
  step: number,
  messages: any,
  page: 'create' | 'restore'
) => {
  const data = [
    {
      title: messages?.stepOneTitle(),
      desc: messages?.stepOneDesc(),
    },
    {
      title: messages?.stepTwoTitle(),
      desc: messages?.stepTwoDesc(),
    },
    {
      title: page === 'create' ? messages?.stepThreeTitle() : null,
      desc: page === 'create' ? messages?.stepThreeDesc() : null,
    },
  ];

  return {
    stepTitle: data[step].title,
    stepDesc: data[step].desc,
  };
};
