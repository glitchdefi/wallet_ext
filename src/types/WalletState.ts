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
      privateKey?: string;
    };
  };
  selectedAddress?: any;
  isBackUp?: boolean;

  // Not save to ext storage
  seedPhrases?: string;
  isWrongPassword?: boolean;
  isValidSeedPhrase?: boolean;
  isInvalidPrivateKey?: boolean;
  showPrivateKey?: string;
}
