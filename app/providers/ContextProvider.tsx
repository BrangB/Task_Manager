import React from 'react'
import  GlobalContext  from '../context/GlobalProvider'

interface Props {
    children: React.ReactNode
}

const ContextProvider = ({children} : Props) => {
  return (
    <GlobalContext>
        {children}
    </GlobalContext>
  )
}

export default ContextProvider