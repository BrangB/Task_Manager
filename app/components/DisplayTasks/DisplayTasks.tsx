"use client"
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import EmptyFile from '../ButtonAnimation/EmptyFile';
import toast from 'react-hot-toast';
import StatusLoading from '../ButtonAnimation/StatusLoading';

interface DisplayTasksProps {
    displayData: string;
  }

interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
  }

const DisplayTasks: React.FC<DisplayTasksProps> = ({displayData}) => {

  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const userLoginString = localStorage.getItem('userLogin');

  if (userLoginString !== null) {
    const userData = JSON.parse(userLoginString);
    setUser_id(userData.user_id); // Set user_id directly
  }
  router.prefetch("/important")

}, []);

//fetch All Tasks
const fetchData = async () => {
    try {
      if (user_id) {
        const tasksfromServer = await axios.post("/api/tasks/gettasks", { user_id });
        setTasks(tasksfromServer.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const fetchImportantTask = async () => {
    try {
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getimportanttasks", { user_id });
        setTasks(tasksfromServer.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const fetchIncompleteTasks = async () => {
    try {
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getcompletetasks", { user_id, complete: false });
        setTasks(tasksfromServer.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const completedTasks = async () => {
    try {
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getcompletetasks", { user_id, complete: true });
        setTasks(tasksfromServer.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

useEffect(() => {
    if(displayData == "tasks"){
        fetchData();
    }else if (displayData == "Important"){
        fetchImportantTask();
    }else if (displayData == "incomplete"){
        fetchIncompleteTasks();
    }else if (displayData == "completed"){
        completedTasks();
    }

}, [user_id]);

const deleteTask = async(id:string) => {
  const isConfirmed = window.confirm("Are you sure?");
  if (isConfirmed && id) {
    try{
      const payload : object = {
        taskId : id
      }
      const task = await axios.delete(`api/tasks/deletetasks`, { data: payload});
      toast.success("Delete Task Successfully")
      router.back();
    }catch(err){
      console.log(err)
      toast.error("Deleting Task Failed!")
    }
  }
};

const changeStatus = async(id:string, status: boolean) => {
  if(id){
    setLoading(true);
    try{
      const payload : object = {
        taskId : id,
        isCompleted : status
      }
      const task = await axios.post(`api/tasks/updatestatus`, { data: payload});
      toast.success("Update Successfully")

      let updatedTasks = tasks.map((task : Task) => {
        if(task.id === id) {
          return {...task , isCompleted : !task.isCompleted}
        }
        return task
      })
      setTasks(updatedTasks)
      setLoading(false);
      // router.back();
    }catch(err){
      console.log(err)
      toast.error("Updating Status Failed!");
      setLoading(false);
    }
  }
}


  return (
    <>
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
                <span 
                  className={`w-[90px] h-[25px] px-2 ${task.isCompleted ? 'bg-green-500' : 'bg-yellow-500'} text-sm text-white rounded-sm cursor-pointer flex items-center justify-center`} onClick={() => changeStatus(task.id, task.isCompleted)}>
                  {loading ? <StatusLoading /> : (task.isCompleted ? 'Completed' : 'Incomplete')}
                </span>
                  <div className="icons flex gap-5 text-md mt-1">
                    <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                    <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => deleteTask(task.id)}></i>
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
    </>
  )
}
export default DisplayTasks

