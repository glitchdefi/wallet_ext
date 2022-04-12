import React from 'react';
import { render } from 'react-dom';

import { ToastsProvider } from 'contexts/ToastsContext';
import { WalletProvider } from './contexts/WalletContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { TokenPriceProvider } from './contexts/TokenPriceContext';

// App
import { App } from './app';

// Initialize languages
import './locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root: React.FC = () => {
  return (
    <ToastsProvider>
      <ApplicationProvider>
        <SettingsProvider>
          <WalletProvider>
            <TokenPriceProvider>
              <App />
            </TokenPriceProvider>
          </WalletProvider>
        </SettingsProvider>
      </ApplicationProvider>
    </ToastsProvider>
  );
};

render(<Root />, window.document.querySelector('#root'));
