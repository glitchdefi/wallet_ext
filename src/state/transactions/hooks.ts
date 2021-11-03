import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { RootState } from 'types';
import { slice } from './reducer';

const useTransactionSelector = () =>
  useSelector((state: RootState) => {
    return state.transactions;
  });

export const useTransactionsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};

export const useTransactions = () => {
  const { transactions } = useTransactionSelector();
  return { transactions };
};
