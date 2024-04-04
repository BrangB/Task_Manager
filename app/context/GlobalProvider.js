"use client"
import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const GlobalContext = createContext();
export const GlobalUpdateForm = createContext();

const GlobalProvider = ({children}) => {

  const [globalTasks, setGlobalTasks] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <GlobalContext.Provider value={{globalTasks, setGlobalTasks}}>
      <GlobalUpdateForm.Provider value={{showUpdateForm, setShowUpdateForm}}>
        {children}
      </GlobalUpdateForm.Provider>
    </GlobalContext.Provider>
  )
}

export default GlobalProvider