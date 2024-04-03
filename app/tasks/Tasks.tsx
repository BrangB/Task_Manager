"use client"

import React  from 'react'
import { motion } from 'framer-motion';
import DisplayTasks from '../components/DisplayTasks/DisplayTasks';
import PageTitle from '../components/PageTitle/PageTitle';


const page = () => {

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <motion.h1
        initial={{ opacity:0 , x: -100}}
        animate={{ opacity:1 , x: 0 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: .4  }}      
       className='p-6'>
        <PageTitle title = "All Tasks" />
      </motion.h1>
      <div className="tasks flex flex-wrap mt-2 items-start justify-center gap-6 h-auto max-h-[600px] overflow-x-hidden overflow-y-scroll scrollbar-hide ">
        <DisplayTasks displayData = "tasks" />
      </div>
    </div>
  )
}

export default page