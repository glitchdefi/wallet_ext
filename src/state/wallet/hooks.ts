import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { slice } from './reducer';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types';
import * as actions from './actions';

const useWalletSelector = () =>
  useSelector((state: RootState) => {
    return state.wallet;
  });

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useSeedPhrases = () => {
  const { seedPhrases } = useWalletSelector();
  return { seedPhrases };
};

/**
 *
 * @returns actions
 */
export const useWalletActionHandlers = (): {
  onCreateSeedPhrases: () => void;
  onCreateWallet: (password: string) => void;
} => {
  const dispatch = useDispatch();

  const onCreateSeedPhrases = useCallback(
    () => dispatch(actions.createSeedWordsAction()),
    [dispatch]
  );

  const onCreateWallet = useCallback(
    (password: string) => dispatch(actions.createWalletAction(password)),
    [dispatch]
  );

  return {
    onCreateSeedPhrases,
    onCreateWallet,
  };
};

export const useStepTitleDesc = (step: number, messages: any) => {
  const data = [
    {
      title: messages.stepOneTitle(),
      desc: messages.stepOneDesc(),
    },
    {
      title: messages.stepTwoTitle(),
      desc: messages.stepTwoDesc(),
    },
    {
      title: messages.stepThreeTitle(),
      desc: messages.stepThreeDesc(),
    },
  ];

  return {
    stepTitle: data[step].title,
    stepDesc: data[step].desc,
  };
};
