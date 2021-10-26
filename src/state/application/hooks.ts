import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';
import { slice } from './reducer';

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
