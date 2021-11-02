import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { SettingState } from 'types/SettingsState';

export const initialState: SettingState = {};

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAutoLock: (state, action) => {
      state.autoLock = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});
