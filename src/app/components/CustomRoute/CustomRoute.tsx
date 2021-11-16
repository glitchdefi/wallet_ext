import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { Routes } from 'constants/routes';
import { useWallet } from 'state/wallet/hooks';

const CustomRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  const { isInitialized, isLocked } = useWallet();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (isInitialized === 'pending' || isInitialized === 'completed') &&
          !isLocked
        ) {
          return (
            <Redirect
              to={{
                pathname: Routes.home,
              }}
            />
          );
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

        return <Component {...props} />;
      }}
    />
  );
};

export default CustomRoute;
