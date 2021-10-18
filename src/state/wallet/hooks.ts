import { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { slice } from './reducer';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types/RootState';
import { PortContext } from '../../contexts/PortContext';

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

export const useLoginActionHandlers = (): { onLogin: () => void } => {
  const dispatch = useDispatch();
  const { port } = useContext(PortContext);

  port.onMessage.addListener((message) => {
    console.log(message);
  });

  const onLogin = useCallback(() => {
    port && port.postMessage({ action: 'createWallet', data: '123' });
  }, [dispatch]);

  return {
    onLogin,
  };
};
