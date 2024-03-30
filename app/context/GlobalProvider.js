"use client"
import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import themes from './theme';
import { useContext } from 'react';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

const GlobalProvider = ({children}) => {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme]

  return (
    <GlobalContext.Provider value={{theme}}>
        <GlobalUpdateContext.Provider value={{}}>
            {children}
        </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdateState = () => useContext(GlobalUpdateContext);

export default GlobalProvider