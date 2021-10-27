export interface WalletState {
  // Save to ext storage
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  accounts?: {
    [key: string]: {
      name?: string;
      avatar?: string;
      address?: string;
      balance?: string;
    };
  };
  selectedAddress?: any;

  // Not save to ext storage
  seedPhrases?: string;
  isUnlockWrongPassword?: boolean;
  isValidSeedPhrase?: boolean;
  isInvalidPrivateKey?: boolean;
}
