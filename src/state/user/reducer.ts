import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { ErrorType } from 'types/Error';
import { UserState } from 'types/UserState';

export const initialState: UserState = {
  isAuthenticated: false,
  error: false,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    loginError(state, action: PayloadAction<ErrorType>) {
      state.error = action.payload.error;
    },
  },
});
