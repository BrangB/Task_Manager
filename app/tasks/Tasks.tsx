"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { motion } from 'framer-motion';

const page = () => {

  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("userLogin");
    router.push("/sign-in")
}

  return (
    <div className='p-6 h-screen w-screen overflow-hidden'>
      <motion.h1
        initial={{ opacity:0 , x: -100}}
        animate={{ opacity:1 , x: 0 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: .4  }}      
      className='text-xl font-semibold relative'>
        All Tasks
        <span className='bg-green-600 w-[50px] h-[3px] absolute -bottom-1 left-0'></span>  
      </motion.h1>
      <div className="tasks flex flex-wrap mt-8 justify-center gap-5 h-[600px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
  {
    Array(12).fill(5).map((_, i) => (
      <motion.div 
      initial={{ opacity:0 , x: -200}}
      animate={{ opacity:1 , x: 0 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: .4 , delay: .3 * i }}     
      key={i} className="task p-4 max-w-[140px] min-h-[180px] max-h-[220px] bg-white rounded-md flex flex-col items-center justify-between">
        <h1 className="title text-sm text-green-700 font-bold">Doing Homework</h1>
        <p className='text-[13px] max-h-[50px] hidden md:flex mt-1 overflow-hidden line-clamp-1'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex nihil non, </p>
        <div className='flex flex-col gap-2'>
          <span className="date text-sm">12/3/2024</span>
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <span className='px-2 py-1 bg-yellow-500 text-sm text-white rounded-sm cursor-pointer'>Incomplete</span>
            <div className="icons flex gap-3 text-sm">
              <i className="fa-solid fa-pen-to-square text-yellow-700 cursor-pointer"></i>
              <i className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </motion.div>
    ))
  }
</div>

      {/* <button className="uppercase px-3 py-2 bg-green-600 text-white text-sm" onClick={signOut}>Sign OUT</button> */}
    </div>
  )
}

export default page