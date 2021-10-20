import { SettingState } from './SettingsState';
import { WalletState } from './WalletState';
import { TransactionsState } from './TransactionsState';
export default interface RootState {
  wallet?: WalletState;
  transactions?: TransactionsState;
  settings?: SettingState;
}
