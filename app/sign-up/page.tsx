"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formData;
        
        if (email === '' || password === '' || confirmPassword === '') {
            alert("Please fill out all fields");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else if (password.length < 5) {
            alert("Password should have at least 5 characters");
        } else {
            // Your signup logic here
            console.log("Form submitted:", formData);
        }
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center text-black'>
            <div className="card min-w-[350px] flex flex-col items-center justify-center gap-6 shadow-xl p-12 py-8">
                <h1 className='font-bold text-2xl uppercase'>Sign <span className='text-green-500'>up</span></h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8 w-full'>
                    <div className="emailInput flex flex-col gap-3 w-full">
                        <label htmlFor="email" className='font-semibold border-l-2 border-green-500 px-2'>Email</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500'  />
                    </div>
                    <div className="passwordInput flex flex-col gap-3 w-full">
                        <label htmlFor="password" className='font-semibold border-l-2 border-green-500 px-2'>Password</label>
                        <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500'  />
                    </div>
                    <div className="confirmPasswordInput flex flex-col gap-3 w-full">
                        <label htmlFor="confirmPassword" className='font-semibold border-l-2 border-green-500 px-2'>Confirm Password</label>
                        <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm password' className='p-2 text-md bg-transparent border rounded-sm placeholder:text-sm border-gray-500 outline-green-500'  />
                    </div>
                    <button type="submit" className='p-2 bg-green-500 hover:bg-green-600 duration-150 w-full text-white uppercase font-semibold tracking-widest'>Sign Up</button>
                </form>
                <span className='text-sm'>If you already have an account, <Link href='sign-in' className='text-green-600 font-semibold uppercase'>sign in</Link></span>
            </div>
        </div>
    );
}

export default Page;
