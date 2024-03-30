"use client"

import React, { useEffect } from 'react'
import { useGlobalState } from '@/app/context/GlobalProvider'
import styled from 'styled-components';
import Image from 'next/image';
import menu from '@/app/utils/menu'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {

    const {theme} = useGlobalState();
    const router = useRouter();
    const pathname = usePathname();

    const handlerClick = (link : string) : void => {
        router.push(link)
    }
    console.log(pathname)
  return (
    <div className={`relative min-w-[250px] text-black backdrop-blur-md shadow-xl bg-[#ffffff67] justify-between rounded-md flex flex-col py-5 items-center`}>
        <div className="profile flex-col gap-4 text-sm uppercase flex items-center justify-center">
            <div className="profile-overlay"></div>
            <div className="image rounded-full overflow-hidden w-[80px] h-[80px]">
                <Image src="/Brang.jpg" width={100} height={100} alt="avatar" className='object-cover' />
            </div>
            <h1 className='font-bold text-lg'>
                <span className='text-blue-900'>Brang</span> Tsawm Aung
            </h1>
        </div>
        <ul className="nav-items w-full flex gap-5 flex-col">
            {
                menu.map((item) => {
                    return(
                        <li className={`nav-item flex duration-200 w-full px-8 py-1 hover:text-[#6169db] rounded-[3px] ${pathname == item.link ? 'border-r-4 border-[#4d72ee] text-[#3753ac]' : ''}`} key={item.id} onClick={() => handlerClick(item.link)}>
                            <p className='mr-5'>{item.icon}</p>
                            <Link href={item.link} className='text-sm flex items-center '>{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
        <button>Sign Out</button>
    </div>
  )
}

export default Sidebar