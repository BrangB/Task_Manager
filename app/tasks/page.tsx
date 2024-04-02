"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {

  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("userLogin");
    router.push("/sign-in")
}

  return (
    <div className='p-12'>
      <button className="uppercase px-3 py-2 bg-green-600 text-white text-sm" onClick={signOut}>Sign OUT</button>
    </div>
  )
}

export default page