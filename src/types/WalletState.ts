export interface WalletState {
  isInitialized?: boolean;
  isUnlocked?: boolean;
  accounts?: object;
  selectedAddress?: any;
  identities?: object;
}
