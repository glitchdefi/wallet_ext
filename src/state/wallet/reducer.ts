import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { WalletState } from 'types/WalletState';

export const initialState: WalletState = {};

export const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    seedPhrasesLoaded: (state, action) => {
      state.seedPhrases = action.payload;
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
    setWrongPassword: (state, action) => {
      state.isWrongPassword = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setShowPrivateKey: (state, action) => {
      state.showPrivateKey = action.payload;
    },
    setIsBackUp: (state, action) => {
      state.isBackUp = action.payload;
    },
    setTokenPrices: (state, action) => {
      state.priceUsd = action.payload;
    },
  },
});
