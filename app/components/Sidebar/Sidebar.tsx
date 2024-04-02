"use client"

import React from 'react'
import { useGlobalState } from '@/app/context/GlobalProvider'
import menu from '@/app/utils/menu'
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import CreateBtn from '../ButtonAnimation/CreateBtn';
import { motion } from 'framer-motion';

const Sidebar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const isSignInRoute = pathname === '/sign-in' || pathname === "/sign-up";

    const handlerClick = (link : string) : void => {
        router.push(link)
    }

  return (
    <div>
        {
            isSignInRoute ? <></>: (
                <motion.div 
                initial={{ opacity:0 , y: 400}}
                animate={{ opacity:1 , y: 0 }}
                exit={{ y: 400, opacity: 0 }}
                transition={{ duration: .4  }}
                className={`fixed bottom-0 w-full text-black shadow-xl bg-[#ffffff] rounded-t-xl flex flex-col py-3 items-center justify-center`}>
                    <ul className="nav-items w-full flex gap-6 p-2 px-3 items-center justify-center relative">
                        <div className='absolute -top-9 creatTaskBtn p-4 rounded-full flex items-center justify-center scale-90 duration-150 hover:scale-105'>
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