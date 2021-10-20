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
  },
});
