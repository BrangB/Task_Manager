import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const Home = () => {
    // const prisma = new PrismaClient()

    async function createUser(formData : FormData) {
        "use server";
        console.log(formData)

    }


    return (
        <div className='w-screen h-screen flex items-center justify-center text-black'>
            <div className="card min-w-[350px] flex flex-col items-center justify-center gap-10 shadow-xl p-12">
                <h1 className='font-bold text-2xl uppercase'>Sign <span className='text-green-500'>In</span></h1>
                <form action={createUser} className='flex flex-col items-center justify-center gap-8 w-full'>
                    <div className="emailInput flex flex-col gap-3 w-full">
                        <label htmlFor="email" className='font-semibold border-l-2 border-green-500 px-2'>Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter your email' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500'  />
                    </div>
                    <div className="passwordInput flex flex-col gap-3 w-full">
                        <label htmlFor="password" className='font-semibold border-l-2 border-green-500 px-2'>Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter your password' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500'  />
                    </div>
                    <button type="submit" className='p-2 bg-green-500 hover:bg-green-600 duration-150 w-full text-white uppercase font-semibold tracking-widest'>LogIn</button>
                </form>
                <span className='text-sm'>If you don't have an account, <Link href='sign-up' className='text-green-600 font-semibold uppercase'>signup</Link></span>
            </div>
        </div>
    )
}

export default Home
