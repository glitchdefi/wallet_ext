import { UserState } from '../state/user/types';
import { Wallet } from '../state/wallet/types';

export interface RootState {
  user: UserState;
  wallet: Wallet;
}
