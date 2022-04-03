import React, { createContext, useCallback, useState } from 'react';

export type ApplicationContextType = {
  loading?: boolean;
  activeTabHomePage?: number;
  onSetActiveTabHomePage?: (activeTab: number) => void;
};

export const ApplicationContext =
  createContext<ApplicationContextType>(undefined);

export const ApplicationProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTabHomePage, setActiveTabHomePage] = useState<number>(0);

  const onSetActiveTabHomePage = useCallback((activeTab: number) => {
    setActiveTabHomePage(activeTab);
  }, []);

  return (
    <ApplicationContext.Provider
      value={{ activeTabHomePage, onSetActiveTabHomePage }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
