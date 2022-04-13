import { useContext } from 'react';
import { TokenPriceContext, TokenPriceContextType } from './Provider';

export const useTokenPrice = (): TokenPriceContextType => {
  const context = useContext(TokenPriceContext);
  if (context === undefined) {
    throw new Error('useTokenPrice must be used within a TokenPriceProvider');
  }

  return context;
};
