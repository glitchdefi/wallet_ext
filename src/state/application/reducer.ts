import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { ApplicationState } from 'types';

export const initialState: ApplicationState = {
  isLoading: false,
  activeTabHomePage: 0,
};

export const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setIsLoadingApp: (state, action) => {
      state.isLoading = action.payload;
    },
    setActiveTabHomePage: (state, action) => {
      state.activeTabHomePage = action.payload;
    },
  },
});
