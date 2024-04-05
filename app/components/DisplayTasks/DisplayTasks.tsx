"use client"
import { useRouter } from 'next/navigation';
import React, {useContext, useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import EmptyFile from '../ButtonAnimation/EmptyFile';
import toast from 'react-hot-toast';
import StatusLoading from '../ButtonAnimation/StatusLoading';
import { GlobalContext, GlobalUpdateForm } from '@/app/context/GlobalProvider';
import UpdateForm from '../UpdateForm/UpdateForm';

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
  const [selectedTask, setSelectedTask] = useState<any>({});
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);

  const {globalTasks, setGlobalTasks} = useContext(GlobalContext);
  const { showUpdateForm, setShowUpdateForm } = useContext(GlobalUpdateForm)

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
      setGlobalTasks([]);
      if (user_id) {
        const tasksfromServer = await axios.post("/api/tasks/gettasks", { user_id });
        setTasks(tasksfromServer.data.tasks);
        setGlobalTasks(tasksfromServer.data.tasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const fetchImportantTask = async () => {
    try {
      setGlobalTasks([]);
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getimportanttasks", { user_id });
        setTasks(tasksfromServer.data.tasks);
        setGlobalTasks(tasksfromServer.data.tasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const fetchIncompleteTasks = async () => {
    try {
      setGlobalTasks([]);
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getcompletetasks", { user_id, complete: false });
        setTasks(tasksfromServer.data.tasks);
        setGlobalTasks(tasksfromServer.data.tasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

const completedTasks = async () => {
    try {
      setGlobalTasks([]);
      if (user_id) { 
        const tasksfromServer = await axios.post("/api/tasks/getcompletetasks", { user_id, complete: true });
        setTasks(tasksfromServer.data.tasks);
        setGlobalTasks(tasksfromServer.data.tasks)
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
      const newTasks = tasks.filter((task: Task) => task.id !== id);
      setTasks(newTasks);
      setGlobalTasks(newTasks)
    }catch(err){
      console.log(err)
      toast.error("Deleting Task Failed!")
    }
  }
};

const changeStatus = async(sTask: any, status: boolean) => {
  if(sTask.id){
    setSelectedTask(sTask);
    setLoading(true);
    try{
      const payload : object = {
        taskId : sTask.id,
        isCompleted : status
      }
      const task = await axios.post(`api/tasks/updatestatus`, { data: payload});
      toast.success("Update Successfully")

      let updatedTasks = tasks.map((task : Task) => {
        if(task.id === sTask.id) {
          return {...task , isCompleted : !task.isCompleted}
        }
        return task
      })
      setTasks(updatedTasks)
      setGlobalTasks(updatedTasks)
      setLoading(false);
      // router.back();
    }catch(err){
      console.log(err)
      toast.error("Updating Status Failed!");
      setLoading(false);
    }
  }
}

const UpdateData = (task : object) => {
  setSelectedTask(task)
  setShowUpdateForm(true)
}

  return (
    <>
      <UpdateForm selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
      {
        globalTasks.length > 0 && globalTasks.map((task : Task, i: number) => {
          return (
            <motion.div 
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.4, delay: (0.3 * i) + .2 }}     
              key={task.id}
              className="task p-4 w-[130px] h-[160px] sm:w-[150px] md:w-[200px] min-h-[160px] sm:h-[180px] md:h-[210px] 2xl:w-[260px] 2xl:h-[270px] bg-white rounded-md flex flex-col items-center justify-between cursor-pointer"
            >
              <h1 className="title text-[18px] md:text-[19px] xl:text-[20px] 2xl:text-[24px] text-green-700 font-bold text-left testWrap">{task.title}</h1>
              <p className='text-[13px] md:text-[15px] 2xl:text-[17px] text-gray-600 text-left w-full max-h-[50px] md:max-h-[70px] xl:h-[95px] hidden md:flex mt-1 line-clamp-1 overflow-hidden text-wrap'>{task.description}</p>
              <div className='flex flex-col gap-3 w-full'>
                <span className="date text-[14px] xl:text-[16px] text-gray-700">{task.date}</span>
                <div className='flex items-center justify-between gap-3 flex-wrap w-full'>
                  <span 
                    className={`w-[90px] h-[25px] md:h-[30px] px-2 ${task.isCompleted ? 'bg-green-500' : 'bg-yellow-500'} text-sm text-white rounded-sm cursor-pointer flex items-center justify-center`} onClick={() => changeStatus(task, task.isCompleted)}>
                    {loading && task.id === selectedTask.id  ? <StatusLoading /> : (task.isCompleted ? 'Completed' : 'Incomplete')}
                  </span>
                  <div className="icons flex gap-5 md:gap-4 text-md mt-1">
                    <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer" onClick={() => UpdateData(task)}></i>
                    <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => deleteTask(task.id)}></i>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })
      }
      {
        globalTasks.length == 0 && (
          <motion.div 
          initial={{ opacity:0 , scale: .2}}
          animate={{ opacity:1 , scale: 1 }}
          exit={{ scale: .2, opacity: 0 }}
          transition={{ duration: .3, delay: .8  }}   
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

