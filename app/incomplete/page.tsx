"use client"

import React  from 'react'
import { motion } from 'framer-motion';
import DisplayTasks from '../components/DisplayTasks/DisplayTasks';
import PageTitle from '../components/PageTitle/PageTitle';

const page = () => {

  return (
    <div className='h-screen w-screen overflow-hidden md:px-8 md:py-4'>
      <motion.h1
        initial={{ opacity:0 , x: -100}}
        animate={{ opacity:1 , x: 0 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: .4  }}      
       className='p-6'>
        <PageTitle title = "Do it Now!" />
      </motion.h1>
      <div className="tasks flex flex-wrap md:px-6 lg:px-8 md:py-3 items-start justify-center gap-4 sm:gap-6 mt-3 md:gap-8 xl:gap-10 h-auto max-h-[600px] overflow-x-hidden overflow-y-scroll scrollbar-hide ">
          <DisplayTasks displayData='incomplete' />
      </div>
    </div>
  )
}

export default page