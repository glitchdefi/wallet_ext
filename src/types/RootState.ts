import { SettingState } from './SettingsState';
import { WalletState } from './WalletState';
import { TransactionsState } from './TransactionsState';
import { ApplicationState } from 'types';
export default interface RootState {
  wallet?: WalletState;
  transactions?: TransactionsState;
  settings?: SettingState;
  application?: ApplicationState;
}
