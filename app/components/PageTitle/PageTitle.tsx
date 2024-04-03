import React from 'react'
import { useRouter } from 'next/navigation';

interface DisplayTasksProps {
    title: string;
  }

const PageTitle: React.FC<DisplayTasksProps>  = ({title}) => {

    const router = useRouter();

    const signOut = () => {
        localStorage.removeItem("userLogin");
        router.push("/sign-in")
    }

  return (
    <p className='text-xl font-semibold relative flex items-center justify-between'>
        {title}
        <button className="uppercase px-2 py-2 bg-green-600 text-white text-sm" onClick={signOut}>Sign OUT</button>
        <span className='bg-green-600 w-[50px] h-[3px] absolute -bottom-1 left-0'></span>  
  </p>
  )
}

export default PageTitle