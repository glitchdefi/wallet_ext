import React, { createContext, useState } from 'react';
import { SigningRequest } from 'scripts/types';

export type SigningReqContextType = {
  signRequests: SigningRequest[];
  setSignRequests: React.Dispatch<React.SetStateAction<SigningRequest[]>>;
};

export const SigningReqContext =
  createContext<SigningReqContextType>(undefined);

export const SigningReqProvider: React.FC = ({ children }) => {
  const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(
    null
  );

  return (
    <SigningReqContext.Provider
      value={{
        signRequests,
        setSignRequests,
      }}
    >
      {children}
    </SigningReqContext.Provider>
  );
};
