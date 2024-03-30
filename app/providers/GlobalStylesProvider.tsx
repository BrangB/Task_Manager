"use client"
import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode
}

const GlobalStylesProvider = ({children} : Props) => {
  return (
    <div className='p-5 flex gap-8 h-screen flex-row'>
        {children}
    </div>
  )
}


export default GlobalStylesProvider