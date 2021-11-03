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
  },
});
