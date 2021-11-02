import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { Routes } from 'constants/routes';
import { useWallet, useWalletSlice } from 'state/wallet/hooks';

const Authenticated: React.FC<RouteProps> = (props) => {
  useWalletSlice();
  const { component: Component, ...rest } = props;
  const { isInitialized, isLocked } = useWallet();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isInitialized !== 'none' && !isLocked) {
          return <Component {...props} />;
        }

        if (isLocked) {
          return (
            <Redirect
              to={{
                pathname: Routes.unlock,
              }}
            />
          );
        }
      }}
    />
  );
};

export default Authenticated;
