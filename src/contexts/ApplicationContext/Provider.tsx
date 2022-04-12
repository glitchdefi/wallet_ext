import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

export type ApplicationContextType = {
  appLoading?: boolean;
  setAppLoading?: Dispatch<SetStateAction<boolean>>;
  activeTabHomePage?: number;
  onSetActiveTabHomePage?: (activeTab: number) => void;
};

export const ApplicationContext =
  createContext<ApplicationContextType>(undefined);

export const ApplicationProvider: React.FC = ({ children }) => {
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [activeTabHomePage, setActiveTabHomePage] = useState<number>(0);

  const onSetActiveTabHomePage = useCallback((activeTab: number) => {
    setActiveTabHomePage(activeTab);
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        appLoading,
        setAppLoading,
        activeTabHomePage,
        onSetActiveTabHomePage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
