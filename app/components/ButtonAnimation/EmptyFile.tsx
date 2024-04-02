import React from 'react'
import Lottie from "lottie-react";
import emptyFile from "@/lottie/emptyfile.json"

const EmptyFile = () => {
  return (
    <div style={{ width: '300px'}} className='flex items-center justify-center'>
      <Lottie
        animationData={emptyFile}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  )
}

export default EmptyFile