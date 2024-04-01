import React from 'react'
import  GlobalContext  from '../context/GlobalProvider'
import {Toaster} from 'react-hot-toast'

interface Props {
    children: React.ReactNode
}

const ContextProvider = ({children} : Props) => {
  return (
    <GlobalContext>
      <Toaster />
        {children}
    </GlobalContext>
  )
}

export default ContextProvider