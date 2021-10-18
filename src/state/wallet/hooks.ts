import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { slice } from './reducer';
import { useInjectReducer } from 'utils/redux-injectors';
import { PortContext } from '../../contexts/PortContext';
import { RootState } from 'types/RootState';
import { PortMessageActions } from 'types/Port';

const userActions = slice.actions;

// const userSelector = () =>
//   useSelector((state: RootState) => {
//     console.log(state);
//     return state.user;
//   });

// export const useUserSlice = () => {
//   useInjectReducer({ key: slice.name, reducer: slice.reducer });
// };

// export const useUserSelector = () => {
//   console.log(userSelector());
//   return userSelector;
// };

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
    stepDesc: data[step].desc 
  }
};

/**
 * 
 * @returns actions
 */
export const useWalletActionHandlers = (): {
  walletInfo: { mnemonic: string; privateKey: string; address: string };
  onCreateNewWallet: () => void;
} => {
  const dispatch = useDispatch();
  const { port } = useContext(PortContext);

  const [walletInfo, setWalletInfo] = useState();

  // Response data from background
  port.onMessage.addListener(
    (message: { action: PortMessageActions; data: any }) => {
      try {
        const { action, data } = message || {};

        if (action === 'createWallet') {
          setWalletInfo(data);
        }
      } catch (error) {
        // Handle error
      }
    }
  );

  const onCreateNewWallet = useCallback(
    (password?: string) => {
      // Send request to background
      port && port.postMessage({ action: 'createWallet', data: password });
    },
    [dispatch]
  );

  return {
    walletInfo,
    onCreateNewWallet,
  };
};
