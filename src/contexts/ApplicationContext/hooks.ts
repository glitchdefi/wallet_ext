import { useContext } from 'react';
import { ApplicationContextType, ApplicationContext } from './Provider';

export const useApplication = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within a ApplicationProvider');
  }

  return context;
};

// export const useAccount = () => {
//   const { walletCtx } = useApplication();
//   const { accounts, selectedAddress } = walletCtx || {};
// };
