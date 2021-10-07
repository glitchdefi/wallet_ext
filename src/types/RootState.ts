import { UserState } from './UserState';
import { Wallet } from './WalletState';
export interface RootState {
  user: UserState;
  wallet: Wallet;
}
