import React from 'react';
import Lottie from "lottie-react";
import createTask from "@/lottie/createTask.json"
import ct from "@/lottie/ct.json"

const CreateBtn = () => {
  return (
    <div style={{ width: '25px'}} className='flex items-center justify-center rotate-45'>
      <Lottie
        animationData={ct}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  )
}

export default CreateBtn