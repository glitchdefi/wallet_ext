import { createSlice } from '../../utils/@reduxjs/toolkit';

// Types
import { ApplicationState } from 'types';

export const initialState: ApplicationState = {
  isLoading: false,
};

export const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setIsLoadingApp: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
