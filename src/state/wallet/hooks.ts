import BN from 'bn.js';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types';
import { slice } from './reducer';
import * as actions from './actions';

const useWalletSelector = () =>
  useSelector((state: RootState) => {
    return state.wallet;
  });

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useIsInitialized = () => {
  const { isInitialized } = useWalletSelector();
  return { isInitialized };
};

export const useSeedPhrases = () => {
  const { seedPhrases } = useWalletSelector();
  return { seedPhrases };
};

export const useWrongPassword = () => {
  const { isWrongPassword } = useWalletSelector();
  return { isWrongPassword };
};

export const useAccounts = () => {
  const { accounts } = useWalletSelector();
  return { accounts };
};

export const useSelectedAddress = () => {
  const { selectedAddress } = useWalletSelector();
  return { selectedAddress };
};

export const useIsValidSeedPhrase = () => {
  const { isValidSeedPhrase } = useWalletSelector();
  return { isValidSeedPhrase };
};

export const useIsInvalidPrivateKey = () => {
  const { isInvalidPrivateKey } = useWalletSelector();
  return { isInvalidPrivateKey };
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

/**
 *
 * @returns wallet actions
 */
export const useWalletActionHandlers = (): {
  onCreateWallet: (password: string) => void;
  onUnlockWallet: (password: string) => void;
  onCheckIsValidSeedPhrase: (seedPhrase: string) => void;
  onRestoreWallet: (seedPhrase: string, password: string) => void;
  onLogoutWallet: (password: string) => void;
  onShowSeedPhrase: (password: string) => void;
  onLockWallet: () => void;
  onCreateCompleted: () => void;
  onClearIsWrongPassword: () => void;
  onClearSeedPhrase: () => void;
  onBackupWalletAction: () => void;
  getBalance: () => void;
  getTokenPrice: (tokenName: string, currency: string) => void;
  checkIsValidAddress: (fromAddress: string, address: string) => void;
  onTransfer: (password: string, toAddress: string, amount: BN) => void;
} => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onCreateWallet = useCallback(
    (password: string) => dispatch(actions.createWalletAction(password)),
    [dispatch]
  );

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

  const onCheckIsValidSeedPhrase = useCallback(
    (seedPhrase?: string) =>
      dispatch(actions.checkIsValidSeedPhraseAction(seedPhrase)),
    [dispatch]
  );

  const onRestoreWallet = useCallback(
    (seedPhrase?: string, password?: string) =>
      dispatch(actions.restoreWalletAction(seedPhrase, password, history)),
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
    () => dispatch(actions.backupWalletAction(history)),
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

  const checkIsValidAddress = useCallback(
    (fromAddress: string, toAddress: string) =>
      dispatch(actions.checkIsValidAddressAction(fromAddress, toAddress)),
    [dispatch]
  );

  const onTransfer = useCallback(
    (password: string, toAddress: string, amount: BN) =>
      dispatch(actions.transferAction(password, toAddress, amount)),
    [dispatch]
  );

  return {
    onCreateWallet,
    onUnlockWallet,
    onCreateCompleted,
    onClearIsWrongPassword,
    onCheckIsValidSeedPhrase,
    onRestoreWallet,
    onLockWallet,
    onLogoutWallet,
    onShowSeedPhrase,
    onClearSeedPhrase,
    onBackupWalletAction,
    getBalance,
    getTokenPrice,
    checkIsValidAddress,
    onTransfer,
  };
};

/**
 *
 * @returns account actions
 */
export const useAccountActionHandlers = (): {
  onAddNewAccount: (name: string) => void;
  onChangeAccount: (address: string) => void;
  onImportAccount: (name: string, privateKey: string) => void;
  onClearIsInvalidPrivateKey: () => void;
  onShowPrivateKeys: (password: string) => void;
  onClearShowPrivateKey: () => void;
  onChangeAccountName: (name: string) => void;
} => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const onClearIsInvalidPrivateKey = useCallback(
    () => dispatch(actions.clearIsInvalidPrivateKey()),
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
    onAddNewAccount,
    onChangeAccount,
    onImportAccount,
    onClearIsInvalidPrivateKey,
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
