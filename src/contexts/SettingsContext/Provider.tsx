import React, { createContext, useCallback, useState } from 'react';
import {
  RequestAutoLockSet,
  RequestNetworkSet,
  ResponseSettings,
} from 'scripts/types';
import { setAutoLock, setNetwork } from 'scripts/ui/messaging';

import { useApplication } from 'contexts/ApplicationContext/hooks';

export type SettingsContextType = {
  settingsCtx: ResponseSettings;
  setSettingsCtx: (settings: ResponseSettings) => void;
  setAutoLock?: (request: RequestAutoLockSet) => void;
  setNetwork?: (request: RequestNetworkSet) => void;
};

export const SettingsContext = createContext<SettingsContextType>(undefined);

export const SettingsProvider: React.FC = ({ children }) => {
  const { setAppLoading } = useApplication();
  const [settings, setSettings] = useState<ResponseSettings>();

  const _setAutoLock = useCallback((request: RequestAutoLockSet) => {
    setAutoLock(request).then(setSettings);
  }, []);

  const _setNetwork = useCallback((request: RequestNetworkSet) => {
    setAppLoading(true);
    setNetwork(request)
      .then(setSettings)
      .finally(() => setAppLoading(false));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settingsCtx: settings,
        setSettingsCtx: setSettings,
        setAutoLock: _setAutoLock,
        setNetwork: _setNetwork,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
