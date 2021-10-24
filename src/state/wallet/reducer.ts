import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { WalletState } from 'types/WalletState';

export const initialState: WalletState = {
  seedPhrases: '',
};

export const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    seedPhrasesLoaded: (state, action) => {
      state.seedPhrases = action.payload;
    },
    setIdentities: (state, action) => {
      state.identities = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setIsLocked: (state, action) => {
      state.isLocked = action.payload;
    },
    setUnlockWrongPassword: (state, action) => {
      state.isUnlockWrongPassword = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});
