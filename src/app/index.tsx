import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createMemoryHistory } from 'history';

import { GlobalStyles } from '../theme/GlobalStyle';
import { Routes } from '../constants/routes';

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

const history = createMemoryHistory();

export const App: React.FC = () => {
  return (
    <Router history={history}>
      <GlobalStyles />
      <ScrollToTop />
      <ContainerLayout>
        <LoadingApplication />
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
        </Switch>
      </ContainerLayout>
    </Router>
  );
};
