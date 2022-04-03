import { useContext } from 'react';
import { WalletContext, WalletContextType } from './Provider';
import { AccountTypes } from 'scripts/types';

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

export const useAccount = (): AccountTypes => {
  const { walletCtx } = useWallet();
  const { accounts, selectedAddress } = walletCtx || {};
  if (accounts && selectedAddress) {
    const account = accounts[selectedAddress];
    if (account) {
      return {
        ...account,
      };
    }
  }

  return {
    name: '--',
    address: '--',
    balance: {
      freeBalance: '0',
      reservedBalance: '0',
    },
    avatar: null,
    whenCreated: null,
    seed: null,
  };
};
