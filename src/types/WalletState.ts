export interface WalletState {
  // Save to ext storage
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  accounts?: {
    [key: string]: AccountType;
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

export type AccountType = {
  name?: string;
  avatar?: string;
  address?: string;
  balance?: any;
  totalValue?: any;
  privateKey?: string;
  createdAt?: number;
};
