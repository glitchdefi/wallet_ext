import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureAppStore } from './store/configureStore';

import { ExtensionStore } from './scripts/lib/localStore';
import { ToastsProvider } from 'contexts/ToastsContext';

// App
import { App } from './app';

// Initialize languages
import './locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root: React.FC = () => {
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
      <ToastsProvider>
        <App />
      </ToastsProvider>
    </Provider>
  );
};

render(<Root />, window.document.querySelector('#root'));
