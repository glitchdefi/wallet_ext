import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureAppStore } from '../store/configureStore';

import { GlobalStyles } from '../theme/GlobalStyle';
import { Routes } from '../constants/routes';

// Components
import { Page } from './layouts/Page';

// Pages
import { WelcomePage } from './pages/Welcome';
import { ImportWalletPage } from './pages/ImportWallet';
import { CreateWalletPage } from './pages/CreateWallet';
import { InternetWarningPage } from './pages/InternetWarning';

// Initialize languages
import '../locales/i18n';

const history = createMemoryHistory();
const store = configureAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyles />
        <Page>
          <Switch>
            {/* <Route exact path="/" component={WelcomePage} />
            <Route
              path={Routes.internetWarning}
              component={InternetWarningPage}
            />
            <Route path={Routes.importWallet} component={ImportWalletPage} /> */}
            <Route
              path="/"
              // path={Routes.createWallet}
              component={CreateWalletPage}
            />
          </Switch>
        </Page>
      </Router>
    </Provider>
  );
};

render(<App />, window.document.querySelector('#root'));
