import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureAppStore } from '../store/configureStore';

import { GlobalStyles } from '../theme/GlobalStyle';
import { Routes } from '../constants/routes';

import { ExtensionStore } from '../scripts/lib/localStore';

// Components
import { ContainerLayout } from './layouts';

// Pages
import { HomePage } from './pages/Home';
import { WelcomePage } from './pages/Welcome';
import { RestoreWalletPage } from './pages/RestoreWallet';
import { CreateWalletPage } from './pages/CreateWallet';
import { InternetWarningPage } from './pages/InternetWarning';
import { UnlockPage } from './pages/Unlock';

// Initialize languages
import '../locales/i18n';

const history = createMemoryHistory();

const App: React.FC = () => {
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
      <Router history={history}>
        <GlobalStyles />
        <ContainerLayout>
          <Switch>
            <Route exact path={Routes.welcome} component={WelcomePage} />
            <Route path={Routes.home} component={HomePage} />
            <Route
              path={Routes.internetWarning}
              component={InternetWarningPage}
            />
            <Route path={Routes.restoreWallet} component={RestoreWalletPage} />
            <Route path={Routes.createWallet} component={CreateWalletPage} />
            <Route path={Routes.unlock} component={UnlockPage} />
          </Switch>
        </ContainerLayout>
      </Router>
    </Provider>
  );
};

render(<App />, window.document.querySelector('#root'));
