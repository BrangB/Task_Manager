"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const Page = () => {
    const [inputData, setInputData] = useState({ email: "", password: "" })

    // const hashPassword = async (password : string) => {
    //     const saltRounds = 10; // Number of salt rounds
    //     const hashedPassword = await bcrypt.hash(password, saltRounds);
    //     return hashedPassword;
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (inputData.email === '' || inputData.password === '') {
            toast.error("Please fill out all fields")
        } else if (inputData.password.length < 5) {
            toast.error("Password should have at least 5 characters")
        } else {
            try{
                // const hashedPassword = await hashPassword(inputData.password);
                console.log(inputData)
                const res = await axios.post("api/users", {email: inputData.email, password: inputData.password})
                toast.success("User Created Success")
            }catch(err){
                toast.error("Creating user error")
            }
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center text-black'>
            <div className="card min-w-[350px] flex flex-col items-center justify-center gap-10 shadow-xl p-12">
                <h1 className='font-bold text-2xl uppercase'>Sign <span className='text-green-500'>In</span></h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8 w-full'>
                    <div className="emailInput flex flex-col gap-3 w-full">
                        <label htmlFor="email" className='font-semibold border-l-2 border-green-500 px-2'>Email</label>
                        <input type="email" id="email" value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value })} placeholder='Enter your email' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500' />
                    </div>
                    <div className="passwordInput flex flex-col gap-3 w-full">
                        <label htmlFor="password" className='font-semibold border-l-2 border-green-500 px-2'>Password</label>
                        <input type="password" id="password" value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} placeholder='Enter your password' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500' />
                    </div>
                    <button type="submit" className='p-2 bg-green-500 hover:bg-green-600 duration-150 w-full text-white uppercase font-semibold tracking-widest'>LogIn</button>
                </form>
                <span className='text-sm'>If you don't have an account, <Link href='sign-up' className='text-green-600 font-semibold uppercase'>signup</Link></span>
            </div>
        </div>
    )
}

export default Page
