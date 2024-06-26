"use client"
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"
import bcrypt from "bcryptjs"
import  { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import BtnAnimation from '../components/ButtonAnimation/BtnAnimation'

const Page = () => {
    const [inputData, setInputData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const hashPassword = async (password : string) => {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (inputData.email.trim() === '' || inputData.password.trim() === '') {
            toast.error("Please fill out all fields")
        } else if (inputData.password.trim().length < 5) {
            toast.error("Password should have at least 5 characters")
        } else {
            try{
                setLoading(true);
                const hashedPassword = await hashPassword(inputData.password);
                const res = await axios.post(`api/loginuser`, {
                    data: {
                        email: inputData.email.trim(),
                        password: hashedPassword
                    },
                });           
                let user = await res.data.user   

                if(user.length == 0){
                    toast.error("Wrong Email Address")
                    setInputData({...inputData ,email: ""})
                    emailInputRef.current && emailInputRef.current.focus();
                    setLoading(false)
                }else{
                    const storedHashedPassword = user[0].password;
                    const passwordMatch = await bcrypt.compare(inputData.password, storedHashedPassword);

                    if(passwordMatch){
                        toast.success("User Login Successfully")
                        localStorage.setItem('userLogin', JSON.stringify(user[0]) )
                        router.push("/");
                        setLoading(false)
                    }else{
                        toast.error("Wrong Password")
                        setInputData({ ...inputData , password: ""})
                        passwordInputRef.current && passwordInputRef.current.focus();
                        setLoading(false) 
                    }
                }
            }catch(err){
                toast.error("Login Failed")
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem("userLogin")){
            router.push("/")
        }
    } , [])

    return (
        <motion.div 
        initial={{ opacity:0 , x: -1000 , scale: .5 }}
        animate={{ opacity:1 , x: 0 ,scale: 1  }}
        exit={{ x: -1000, opacity: 0 , scale: .5}}
        transition={{ duration: .4  }}
        className='w-screen h-screen flex items-center justify-center text-black'>
            <div className="card min-w-[350px] flex flex-col items-center justify-center gap-10 shadow-xl p-12">
                <h1 className='font-bold text-2xl uppercase'>Sign <span className='text-green-500'>In</span></h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8 w-full'>
                    <div className="emailInput flex flex-col gap-3 w-full">
                        <label htmlFor="email" className='font-semibold border-l-2 border-green-500 px-2'>Email</label>
                        <input type="email" ref={emailInputRef} id="email" value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value.trim() })} placeholder='Enter your email' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500' />
                    </div>
                    <div className="passwordInput flex flex-col gap-3 w-full relative">
                        <label htmlFor="password" className='font-semibold border-l-2 border-green-500 px-2'>Password</label>
                        <input type={showPassword ? "text" : "password"} ref={passwordInputRef} id="password" value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value.trim() })} placeholder='Enter your password' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500' />
                        {
                            showPassword ? <i className="fa-solid fa-eye-slash absolute top-1 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye absolute top-1 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></i>
                        }
                    </div>
                    <button type="submit" className='p-2 bg-green-500 hover:bg-green-600 duration-150 w-full text-white uppercase font-semibold tracking-widest flex items-center justify-center'>{loading ? <BtnAnimation /> : "LogIn"}</button>
                </form>
                <span className='text-sm'>If you don't have an account, <Link href='sign-up' className='text-green-600 font-semibold uppercase'>signup</Link></span>
            </div>
        </motion.div>
    )
}

export default Page
