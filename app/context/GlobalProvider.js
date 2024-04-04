"use client"
import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

  const [globalTasks, setGlobalTasks] = useState([]);

  return (
    <GlobalContext.Provider value={{globalTasks, setGlobalTasks}}>
            {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider