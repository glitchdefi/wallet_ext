export interface WalletState {
  // Save to ext storage
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  accounts?: {
    [key: string]: AccountType;
  };
  selectedAddress?: any;
  firstAddress?: any;
  isBackUp?: boolean;
  isValidAddress?: boolean;
  priceUsd?: number;

  // Not save to ext storage
  seedPhrases?: string;
  isWrongPassword?: boolean;
  showPrivateKey?: string;
}

export type AccountType = {
  name?: string;
  avatar?: string;
  address?: string;
  whenCreated?: number;
  seed?: any;
  balance?: any;
  totalValue?: any;
};
