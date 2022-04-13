import React, { createContext, useState } from 'react';
import { AuthorizeRequest } from 'scripts/types';

export type AuthorizeReqContextType = {
  authRequests: AuthorizeRequest[];
  setAuthRequests: React.Dispatch<React.SetStateAction<AuthorizeRequest[]>>;
};

export const AuthorizeReqContext =
  createContext<AuthorizeReqContextType>(undefined);

export const AuthorizeReqProvider: React.FC = ({ children }) => {
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
    null
  );

  return (
    <AuthorizeReqContext.Provider
      value={{
        authRequests,
        setAuthRequests,
      }}
    >
      {children}
    </AuthorizeReqContext.Provider>
  );
};
