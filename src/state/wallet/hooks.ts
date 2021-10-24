import { useCallback } from 'react';
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

export const useUnlockWrongPassword = () => {
  const { isUnlockWrongPassword } = useWalletSelector();
  return { isUnlockWrongPassword };
};

export const useIdentities = () => {
  const { identities } = useWalletSelector();
  return { identities };
};

export const useAccounts = () => {
  const { accounts } = useWalletSelector();
  return { accounts };
};

export const useSelectedAddress = () => {
  const { selectedAddress } = useWalletSelector();
  return { selectedAddress };
};

export const useWallet = () => {
  return useWalletSelector();
};

/**
 *
 * @returns actions
 */
export const useWalletActionHandlers = (): {
  onCreateWallet: (password: string) => void;
  onUnlockWallet: (password: string) => void;
  onCreateCompleted: () => void;
  onClearIsWrongUnlockWallet: () => void;
} => {
  const dispatch = useDispatch();

  const onCreateWallet = useCallback(
    (password: string) => dispatch(actions.createWalletAction(password)),
    [dispatch]
  );

  const onUnlockWallet = useCallback(
    (password: string) => dispatch(actions.unlockWalletAction(password)),
    [dispatch]
  );

  const onCreateCompleted = useCallback(
    () => dispatch(actions.createCompletedAction()),
    [dispatch]
  );

  const onClearIsWrongUnlockWallet = useCallback(
    () => dispatch(actions.clearIsWrongUnlockWallet()),
    [dispatch]
  );

  return {
    onCreateWallet,
    onUnlockWallet,
    onCreateCompleted,
    onClearIsWrongUnlockWallet,
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
