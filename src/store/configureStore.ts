import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { RootState } from 'types';

import { createReducer } from './reducers';

export function configureAppStore(initialState?: RootState) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}
