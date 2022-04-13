import React, { createContext, useState } from 'react';

export type TokenPriceContextType = {
  tokenPrice: any;
  setTokenPrice: (price: any) => void;
};

export const TokenPriceContext =
  createContext<TokenPriceContextType>(undefined);

export const TokenPriceProvider: React.FC = ({ children }) => {
  const [tokenPrice, setTokenPrice] = useState<any>('0');

  return (
    <TokenPriceContext.Provider
      value={{
        tokenPrice,
        setTokenPrice,
      }}
    >
      {children}
    </TokenPriceContext.Provider>
  );
};
