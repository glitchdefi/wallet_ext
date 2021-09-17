import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureAppStore } from '../store/configureStore';

// Pages
import { WelcomePage } from './pages/Welcome';
import { ImportWalletPage } from './pages/ImportWallet';

const history = createMemoryHistory();
const store = configureAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/import-wallet" component={ImportWalletPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

render(<App />, window.document.querySelector('#root'));
