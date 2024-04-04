"use client"

import React, { FormEvent, useState, useRef, useEffect } from 'react'
import menu from '@/app/utils/menu'
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import CreateBtn from '../ButtonAnimation/CreateBtn';
import { motion } from 'framer-motion';
import BackBtn from '../ButtonAnimation/BackBtn';
import toast from 'react-hot-toast';
import axios from 'axios';
import BtnAnimation from '../ButtonAnimation/BtnAnimation';

const Sidebar = () => {

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        isCompleted: false,
        isImportant: false
    })
    const [user_id, setUser_id] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const isSignInRoute = pathname === '/sign-in' || pathname === "/sign-up";

    useEffect(() => {
        const userLoginString = localStorage.getItem('userLogin');
      
        if (userLoginString !== null) {
          const userData = JSON.parse(userLoginString);
          setUser_id(userData.user_id); // Set user_id directly
        }
      
      }, []);

    const handlerClick = (link : string) : void => {
        router.push(link)
    }

    const handlerForm = async(e : FormEvent)  =>  {
        e.preventDefault();
        if(formData.title == "" || formData.description == "" || formData.date == ""){
            toast.error("Please fill out all fields")
        }else{
            try{
                setLoading(true);
                const task = await axios.post("/api/tasks", {
                    user_id: user_id,
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    date: formData.date.trim(),
                    isCompleted: false,
                    isImportant: formData.isImportant
                })
                toast.success("Creating Task Successfully!!")
                setFormData({
                    title: "",
                    description: "",
                    date: "",
                    isCompleted: false,
                    isImportant: false
                })
                setLoading(false);
                setShowForm(false);
                router.back();
            }catch(err){
                console.log(err);
                toast.error("Creating New Tasks Fails")
                setLoading(false);
            }
        }

    }

  return (
    <div>
        <div className={`addTask w-screen h-screen bg-[#ffffff48] backdrop-blur-md flex items-center justify-center absolute top-0 left-0 z-50 duration-300 ${showForm ? 'translate-y-0' : '-translate-y-[100%]'}`}>
            <div className='absolute top-10 right-10 bg-green-600 flex items-center justify-center p-2 rounded-full' onClick={() => setShowForm(!showForm)}><BackBtn /></div>
            <div className="form p-8 bg-white min-w-[300px] flex flex-col gap-5 shadow-lg hover:shadow-xl duration-200">
                <h1 className='text-xl text-center font-semibold'>Create New <span className='text-green-600'>Tasks</span></h1>
                <form onSubmit={handlerForm} className='flex flex-col gap-8'>
                    <div className="title flex flex-col gap-2">
                        <label htmlFor="title" className='text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600'>Title</label>
                        <input type="text" id='title' ref={titleRef} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}  className='px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm' placeholder='Enter task title'/>
                    </div>
                    <div className="desc flex flex-col gap-2">
                        <label htmlFor="desc" className='text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600'>Description</label>
                        <input type="text" id='desc' ref={descriptionRef} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}  className='px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm' placeholder='Enter task title'/>
                    </div>
                    <div className="date flex flex-col gap-2">
                        <label htmlFor="date" className='text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600'>Date</label>
                        <input type="date" id='date' value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}  className='px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm' placeholder='Enter task title'/>
                    </div>
                    <div className="important flex flex-col gap-2">
                        <label htmlFor="vip" className='text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600'>Important</label>
                        {
                            formData.isImportant ? <i className=" fa-regular fa-square-check" onClick={(e) =>setFormData({...formData, isImportant: !formData.isImportant})}></i> : <i className="fa-regular fa-square" onClick={(e) =>setFormData({...formData, isImportant: !formData.isImportant})}></i>
                        }
                    </div>
                    <button  className='bg-green-500 hover:bg-green-600 duration-200 flex items-center justify-center text-white p-3 h-10 uppercase font-semibold text-sm'>{loading ? <BtnAnimation /> : "Add Task"}</button>
                </form>
            </div>
        </div>
        {
            isSignInRoute ? <></>: (
                <motion.div 
                initial={{ opacity:0 , y: 400}}
                animate={{ opacity:1 , y: 0 }}
                exit={{ y: 400, opacity: 0 }}
                transition={{ duration: .4  }}
                className={`fixed bottom-0 w-full text-black shadow-xl bg-[#ffffff] rounded-t-xl flex flex-col py-3 items-center justify-center z-40`}>
                    <ul className="nav-items w-full flex gap-6 p-2 px-3 items-center justify-center relative">
                        <div className=' animate-bounce absolute -top-9 creatTaskBtn p-4 rounded-full flex items-center justify-center scale-90 duration-150 hover:scale-105' onClick={() => setShowForm(!showForm)}>
                            <CreateBtn />
                        </div>
                        {
                            menu.map((item) => {
                                return(
                                    <li className={`nav-item flex flex-col gap-2 items-center justify-center duration-200 w-full text-[#000000b9] py-1 hover:text-green-600 rounded-[3px] ${pathname == item.link ? 'border-b-3 border-green-600 text-green-500' : ''}`} key={item.id} onClick={() => handlerClick(item.link)}>
                                        <p className='text-md'>{item.icon}</p>
                                        <Link href={item.link} className='text-sm flex items-center'>{item.title}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </motion.div>
            )
        }
    </div>
  )
}

export default Sidebar