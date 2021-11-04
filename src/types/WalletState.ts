export interface WalletState {
  // Save to ext storage
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  accounts?: {
    [key: string]: {
      name?: string;
      avatar?: string;
      address?: string;
      balance?: any;
      privateKey?: string;
      createdAt?: number;
    };
  };
  selectedAddress?: any;
  isBackUp?: boolean;
  isValidAddress?: boolean;
  priceUsd?: number;

  // Not save to ext storage
  seedPhrases?: string;
  isWrongPassword?: boolean;
  isValidSeedPhrase?: boolean;
  isInvalidPrivateKey?: boolean;
  showPrivateKey?: string;
}
