import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createMemoryHistory } from 'history';

import { GlobalStyles } from '../theme/GlobalStyle';
import { Routes } from '../constants/routes';

// Hooks
import {
  useApplicationSlice,
  useLoadingApplication,
} from 'state/application/hooks';
import { useWalletSlice } from 'state/wallet/hooks';

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

const history = createMemoryHistory();

export const App: React.FC = () => {
  useWalletSlice();
  useApplicationSlice();
  const { isLoading } = useLoadingApplication();

  return (
    <Router history={history}>
      <GlobalStyles />
      <ScrollToTop />
      <ContainerLayout>
        {isLoading && <LoadingApplication />}
        <Switch>
          <GRoute exact path={Routes.welcome} component={WelcomePage} />

          <Route
            path={Routes.internetWarning}
            component={InternetWarningPage}
          />
          <Route path={Routes.restoreWallet} component={RestoreWalletPage} />
          <Route path={Routes.createWallet} component={CreateWalletPage} />

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
          <Authenticated path={Routes.aboutUs} component={AboutUsPage} />
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
          <Authenticated path={Routes.addAssets} component={AddAssetsPage} />
          <Authenticated path={Routes.backUp} component={BackUpPage} />
        </Switch>
      </ContainerLayout>
    </Router>
  );
};
