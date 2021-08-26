import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createMemoryHistory } from 'history';

// Pages
import { WelcomePage } from './pages/Welcome';
import { ImportWalletPage } from './pages/ImportWallet';

const history = createMemoryHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/import-wallet" component={ImportWalletPage} />
      </Switch>
    </Router>
  );
};

render(<App />, window.document.querySelector('#root'));
