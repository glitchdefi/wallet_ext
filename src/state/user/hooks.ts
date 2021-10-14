import { useDispatch, useSelector } from 'react-redux';
import { slice } from './reducer';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types/RootState';
import { useCallback } from 'react';

const userActions = slice.actions;

const userSelector = () => useSelector((state: RootState) => state.user);

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useUserSelector = () => {
  console.log(userSelector());
  return userSelector;
};

export const useLoginActionHandlers = (): { onLogin: () => void } => {
  const dispatch = useDispatch();

  const onLogin = useCallback(() => {
    dispatch(userActions.login());
  }, [dispatch]);

  return {
    onLogin,
  };
};
