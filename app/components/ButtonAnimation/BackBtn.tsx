import React from 'react';
import Lottie from "lottie-react";
import Back from "@/lottie/backForm.json";

const BackBtn = () => {
  return (
    <div style={{ width: '25px'}} className='flex items-center justify-center'>
      <Lottie
        animationData={Back}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  )
}

export default BackBtn