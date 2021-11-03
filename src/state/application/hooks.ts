import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';
import { slice } from './reducer';

const { actions } = slice;

const useApplicationSelector = () =>
  useSelector((state: RootState) => {
    return state.application;
  });

export const useApplicationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useLoadingApplication = () => {
  const { isLoading } = useApplicationSelector() || {};
  return { isLoading };
};

export const useActiveTabHome = () => {
  const { activeTabHomePage } = useApplicationSelector() || {};
  return { activeTabHomePage };
};

export const useAppActionHandlers = (): {
  onSetActiveTabHome: (activeTab?: number) => void;
} => {
  const dispatch = useDispatch();

  const onSetActiveTabHome = useCallback(
    (activeTab?: number) => dispatch(actions.setActiveTabHomePage(activeTab)),
    [dispatch]
  );

  return {
    onSetActiveTabHome,
  };
};
