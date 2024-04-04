import React from 'react';
import Lottie from "lottie-react";
import statusLoading from "@/lottie/statusLoading.json"


const StatusLoading = () => {
  return (
    <div style={{ width: '30px'}} className='flex items-center justify-center'>
      <Lottie
        animationData={statusLoading}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  )
}

export default StatusLoading