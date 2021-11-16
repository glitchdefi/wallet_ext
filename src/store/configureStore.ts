import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { RootState } from 'types';

import { rootReducer } from './reducers';

export function configureAppStore(initialState?: RootState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [...getDefaultMiddleware()],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production',
  });

  return store;
}
