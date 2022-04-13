import { useContext } from 'react';
import { AuthorizeReqContextType, AuthorizeReqContext } from './Provider';

export const useAuthorizeReq = (): AuthorizeReqContextType => {
  const context = useContext(AuthorizeReqContext);
  if (context === undefined) {
    throw new Error(
      'useAuthorizeReq must be used within a AuthorizeReqProvider'
    );
  }

  return context;
};
