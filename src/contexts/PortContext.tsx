import React, { useEffect, useState } from 'react';
import { Port } from 'types/Port';

interface Props {
  children: React.ReactNode;
}

export const PortContext = React.createContext<{
  port?: Port;
  callback?: any;
}>({});

export const PortProvider: React.FC<Props> = ({ children }) => {
  const port = chrome.runtime.connect({ name: 'glitchController' });
  return (
    <PortContext.Provider value={{ port }}>
      {children}
    </PortContext.Provider>
  );
};
