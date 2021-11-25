import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, useHistory } from 'react-router';
import { createMemoryHistory } from 'history';

import { GlobalStyles } from '../theme/GlobalStyle';
import { UPDATE_TIME } from 'constants/values';
import { Routes } from '../constants/routes';

import { ToastListener } from 'contexts/ToastsContext';

// Hooks
import { useLoadingApplication } from 'state/application/hooks';
import { useIsInitialized, useWalletActionHandlers } from 'state/wallet/hooks';
import { useAutoLockTimer } from 'state/settings/hooks';

// Components
import { ContainerLayout } from './layouts';
import { LoadingApplication } from './components/Loading';
import { GRoute, Authenticated } from './components/CustomRoute';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/Home';
import { WelcomePage } from './pages/Welcome';
import { RestoreWalletPage } from './pages/RestoreWallet';
import { CreateWalletPage } from './pages/CreateWallet';
import { InternetWarningPage } from './pages/InternetWarning';
import { UnlockPage } from './pages/Unlock';
import { CreateImportAccountPage } from './pages/CreateImportAccount';
import { AccountDetailsPage } from './pages/AccountDetails';
import { ShowPrivateKeysPage } from './pages/ShowPrivateKeys';
import { AboutUsPage } from './pages/AboutUs';
import { LogoutWalletPage } from './pages/LogoutWallet';
import { RevealMnemonicPhrasePage } from './pages/RevealMnemonicPhrase';
import { TokenDetailsPage } from './pages/TokenDetails';
import { ReceiveTokenPage } from './pages/ReceiveToken';
import { AddAssetsPage } from './pages/AddAssets';
import { BackUpPage } from './pages/BackUp';
import { SendTokenPage } from './pages/SendToken';
import { Transition, TransitionGroup } from 'react-transition-group';

const history = createMemoryHistory();

export const App: React.FC = () => {
  const { isLoading } = useLoadingApplication();
  const { isInitialized } = useIsInitialized();
  const { onLockWallet, getBalance, getTokenPrice } = useWalletActionHandlers();
  const { openTime, duration } = useAutoLockTimer();

  const [timeQuery, setTimeQuery] = useState(0);

  useEffect(() => {
    if (
      isInitialized !== 'none' &&
      duration &&
      new Date().getTime() - openTime > duration
    ) {
      onLockWallet();
      history.push(Routes.unlock);
    }
  }, [duration]);

  // useEffect(() => {
  //   const job = setInterval(() => {
  //     setTimeQuery((prev) => prev + 1);
  //   }, UPDATE_TIME);

  //   return () => {
  //     clearInterval(job);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isInitialized !== 'none') {
  //     getBalance();
  //     getTokenPrice('glitch-protocol', 'usd');
  //   }
  // }, [timeQuery]);

  return (
    <Router history={history}>
      <GlobalStyles />
      <ScrollToTop />
      <ToastListener />
      <ContainerLayout>
        {isLoading && <LoadingApplication />}

        <Route
          render={({ location }) => {
            const { key } = location;

            return (
              <TransitionGroup component={null}>
                <Transition
                  key={key}
                  appear={true}
                  timeout={{ enter: 750, exit: 0 }}
                >
                  <Switch>
                    <GRoute
                      exact
                      path={Routes.welcome}
                      component={WelcomePage}
                    />

                    <Route
                      path={Routes.internetWarning}
                      component={InternetWarningPage}
                    />
                    <Route
                      path={Routes.restoreWallet}
                      component={RestoreWalletPage}
                    />
                    <Route
                      path={Routes.createWallet}
                      component={CreateWalletPage}
                    />

                    <Route path={Routes.unlock} component={UnlockPage} />

                    <Authenticated path={Routes.home} component={HomePage} />
                    <Authenticated
                      path={Routes.createImportAccount}
                      component={CreateImportAccountPage}
                    />
                    <Authenticated
                      path={Routes.accountDetails}
                      component={AccountDetailsPage}
                    />
                    <Authenticated
                      path={Routes.showPrivateKeys}
                      component={ShowPrivateKeysPage}
                    />
                    <Authenticated
                      path={Routes.aboutUs}
                      component={AboutUsPage}
                    />
                    <Authenticated
                      path={Routes.logoutWallet}
                      component={LogoutWalletPage}
                    />
                    <Authenticated
                      path={Routes.revealMnemonicPhrase}
                      component={RevealMnemonicPhrasePage}
                    />
                    <Authenticated
                      path={Routes.tokenDetails}
                      component={TokenDetailsPage}
                    />
                    <Authenticated
                      path={Routes.receiveToken}
                      component={ReceiveTokenPage}
                    />
                    <Authenticated
                      path={Routes.sendToken}
                      component={SendTokenPage}
                    />
                    <Authenticated
                      path={Routes.addAssets}
                      component={AddAssetsPage}
                    />
                    <Authenticated
                      path={Routes.backUp}
                      component={BackUpPage}
                    />
                  </Switch>
                </Transition>
              </TransitionGroup>
            );
          }}
        />
      </ContainerLayout>
    </Router>
  );
};
