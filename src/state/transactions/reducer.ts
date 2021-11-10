import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { TransactionsState } from 'types/TransactionsState';

export const initialState: TransactionsState = {};

export const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setIsTransferSuccess: (state, action) => {
      state.isTransferSuccess = action.payload;
    },
    setIsFetchingTransactions: (state, action) => {
      state.isFetchingTransactions = action.payload;
    },
    setTransactionsError: (state, action) => {
      state.transactionsError = action.payload;
    },
    setTotalTransactions: (state, action) => {
      state.totalTransactions = action.payload;
    },
  },
});
