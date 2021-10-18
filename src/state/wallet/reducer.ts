import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { ErrorType } from 'types/Error';
import { WalletState } from 'types/WalletState';

export const initialState: WalletState = {};

export const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    
  },
});
