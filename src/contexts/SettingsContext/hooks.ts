import { useContext } from 'react';
import { ResponseSettings } from 'scripts/types';
import { SettingsContextType, SettingsContext } from './Provider';

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};

export const useAutoLock = (): ResponseSettings['autoLock'] => {
  const { settingsCtx } = useSettings();
  const { autoLock } = settingsCtx || {};

  return { ...autoLock };
};

export const useNetwork = (): ResponseSettings['network'] => {
  const { settingsCtx } = useSettings();
  const { network } = settingsCtx || {};

  return network;
};
