import React, { createContext, useCallback, useState } from 'react';
import { RequestAutoLockSet, ResponseSettings } from 'scripts/types';
import { setAutoLock } from 'scripts/ui/messaging';

export type SettingsContextType = {
  settingsCtx: ResponseSettings;
  setSettingsCtx: (settings: ResponseSettings) => void;
  setAutoLock?: (request: RequestAutoLockSet) => void;
};

export const SettingsContext = createContext<SettingsContextType>(undefined);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<ResponseSettings>();

  const _setAutoLock = useCallback((request: RequestAutoLockSet) => {
    setAutoLock(request).then(setSettings);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settingsCtx: settings,
        setSettingsCtx: setSettings,
        setAutoLock: _setAutoLock,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
