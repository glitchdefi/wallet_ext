// /**
//  * Combine all reducers in this file and export the combined reducers.
//  */

import { combineReducers } from 'redux';

// import { combineReducers } from '@reduxjs/toolkit';

// import { InjectedReducersType } from '../utils/types/injector-typings';

// /**
//  * Merges the main reducer with the router state and dynamically injected reducers
//  */
// export function createReducer(injectedReducers: InjectedReducersType = {}) {
//   if (Object.keys(injectedReducers).length === 0) {
//     return (state: any) => state;
//   } else {
//     return combineReducers({
//       ...injectedReducers,
//     });
//   }
// }

import { slice as walletSlice } from '../state/wallet/reducer';
import { slice as settingsSlice } from '../state/settings/reducer';
import { slice as applicationSlice } from '../state/application/reducer';
import { slice as transactionsSlice } from '../state/transactions/reducer';

export const rootReducer = combineReducers({
  wallet: walletSlice.reducer,
  settings: settingsSlice.reducer,
  application: applicationSlice.reducer,
  transactions: transactionsSlice.reducer,
});
