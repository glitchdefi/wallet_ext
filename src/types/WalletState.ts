export interface WalletState {
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  accounts?: {
    [key: string]: {
      address?: string;
      balance?: string;
    };
  };
  selectedAddress?: any;
  identities?: {
    [key: string]: {
      address?: string;
      name?: string;
      avatar?: string;
    };
  };
  seedPhrases?: string;
  isUnlockWrongPassword?: boolean;
}
