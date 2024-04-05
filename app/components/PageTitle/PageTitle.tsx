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
    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold relative flex items-center justify-between'>
        {title}
        <button className="uppercase px-2 py-2 bg-green-600 text-white text-sm" onClick={signOut}>Sign OUT</button>
        <span className='bg-green-600 w-[50px] md:w-[80px] h-[3px] md:h-[5px] absolute -bottom-1 md:-bottom-2 left-0'></span>  
  </p>
  )
}

export default PageTitle