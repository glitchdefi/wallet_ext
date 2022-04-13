import { useContext } from 'react';
import { SigningReqContext, SigningReqContextType } from './Provider';

export const useSigningReq = (): SigningReqContextType => {
  const context = useContext(SigningReqContext);
  if (context === undefined) {
    throw new Error('useSigningReq must be used within a SigningReqProvider');
  }

  return context;
};
