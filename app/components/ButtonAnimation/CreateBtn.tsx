import React from 'react';
import Lottie from "lottie-react";
import ct from "@/lottie/ct.json"

const CreateBtn = () => {
  return (
    <div className='w-[23px] sm:w-[25px] flex items-center justify-center rotate-45'>
      <Lottie
        animationData={ct}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  )
}

export default CreateBtn