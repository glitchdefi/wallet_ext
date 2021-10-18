import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureAppStore } from '../store/configureStore';

import { GlobalStyles } from '../theme/GlobalStyle';
import { Routes } from '../constants/routes';

import { ExtensionStore } from '../scripts/lib/localStore';
import { PortProvider } from '../contexts/PortContext';

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

const App = () => {
  const [store, setStore] = useState(configureAppStore());

  useEffect(() => {
    async function getInitialState() {
      const localStore = new ExtensionStore();
      const initState = await localStore.getAllStorageData();

      setStore(configureAppStore(initState));
    }

    getInitialState();
  }, []);

  return (
    <Provider store={store}>
      <PortProvider>
        <Router history={history}>
          <GlobalStyles />
          <Page>
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route
                path={Routes.internetWarning}
                component={InternetWarningPage}
              />
              <Route path={Routes.importWallet} component={ImportWalletPage} />
              <Route path={Routes.createWallet} component={CreateWalletPage} />
            </Switch>
          </Page>
        </Router>
      </PortProvider>
    </Provider>
  );
};

render(<App />, window.document.querySelector('#root'));
