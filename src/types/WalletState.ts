export interface WalletState {
  // Save to ext storage
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

  // Not save to ext storage
  seedPhrases?: string;
  isUnlockWrongPassword?: boolean;
  isValidSeedPhrase?: boolean;
}
