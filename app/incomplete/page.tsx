"use client"
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import EmptyFile from '../components/ButtonAnimation/EmptyFile';

const page = () => {

  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [user_id, setUser_id] = useState("");

  interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
  }

  useEffect(() => {
    const userLoginString = localStorage.getItem('userLogin');
  
    if (userLoginString !== null) {
      const userData = JSON.parse(userLoginString);
      setUser_id(userData.user_id); // Set user_id directly
    }
  
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user_id) { 
          const tasksfromServer = await axios.post("/api/tasks/getcompletetasks", { user_id, complete: false });
          setTasks(tasksfromServer.data.tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchData();
  }, [user_id]);

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <motion.h1
        initial={{ opacity:0 , x: -100}}
        animate={{ opacity:1 , x: 0 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: .4  }}      
       className='p-6'>
        <p className='text-xl font-semibold relative'>
          Do it Now!
          <span className='bg-green-600 w-[50px] h-[3px] absolute -bottom-1 left-0'></span>  
        </p>
      </motion.h1>
      <div className="tasks flex flex-wrap mt-2 justify-center gap-6 h-[600px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {
        tasks.length > 0 && tasks.map((task : Task, i: number) => {
          return (
            <motion.div 
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 * i }}     
              key={task.id}
              className="task p-4 max-w-[150px] min-h-[160px] max-h-[180px] bg-white rounded-md flex flex-col items-center justify-between cursor-pointer"
            >
              <h1 className="title text-[18px] text-green-700 font-bold text-left testWrap">{task.title}</h1>
              <p className='text-[13px] max-h-[50px] hidden md:flex mt-1 overflow-hidden line-clamp-1'>{task.description}</p>
              <div className='flex flex-col gap-2'>
                <span className="date text-[14px] text-gray-700">{task.date}</span>
                <div className='flex items-center justify-between gap-3 flex-wrap'>
                  <span className={`px-2 py-1 ${task.isCompleted ? 'bg-green-500' : 'bg-yellow-500'} text-sm text-white rounded-sm cursor-pointer`}>{task.isCompleted ? 'Completed' : 'Incomplete'}</span>
                  <div className="icons flex gap-5 text-md mt-1">
                    <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                    <i className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })
      }
      {
        tasks.length == 0 && (
          <motion.div 
          initial={{ opacity:0 , scale: .2}}
          animate={{ opacity:1 , scale: 1 }}
          exit={{ scale: .2, opacity: 0 }}
          transition={{ duration: .4  }}   
          className='flex flex-col items-center justify-center'>
            <EmptyFile />
            <p className='text-xl font-bold'>Add New <span className='text-green-600'>Task</span></p>
          </motion.div>
        )
      }
      </div>
    </div>
  )
}

export default page