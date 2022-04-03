import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureAppStore } from './store/configureStore';

import { ToastsProvider } from 'contexts/ToastsContext';
import { WalletProvider } from './contexts/WalletContext';
import { ApplicationProvider } from './contexts/ApplicationContext';

// App
import { App } from './app';

// Initialize languages
import './locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root: React.FC = () => {
  return (
    <Provider store={configureAppStore()}>
      <ToastsProvider>
        <ApplicationProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </ApplicationProvider>
      </ToastsProvider>
    </Provider>
  );
};

render(<Root />, window.document.querySelector('#root'));
