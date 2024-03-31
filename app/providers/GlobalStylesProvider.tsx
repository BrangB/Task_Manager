"use client"
import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode
}

const GlobalStylesProvider = ({children} : Props) => {
  return (
    <div>
        {children}
    </div>
  )
}


export default GlobalStylesProvider