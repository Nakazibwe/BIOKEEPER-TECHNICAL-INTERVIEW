import React, { useState } from 'react';
import { createContext } from 'react';
import useLocalStorage from './storage';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [staffId, setStaffId] = useLocalStorage('staffId', '');

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        staffId,
        setStaffId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
