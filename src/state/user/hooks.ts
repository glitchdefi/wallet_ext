import { useSelector } from 'react-redux';
import { slice } from './reducer';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types/RootState';

const userActions = slice.actions;

const userSelector = () => useSelector((state: RootState) => state.user);

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useUserSelector = () => {
  console.log(userSelector());
  return userSelector;
};
