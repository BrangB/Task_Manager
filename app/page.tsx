"use client"
import { useEffect } from "react";
import Tasks from "./Tasks/Tasks";
import Sidebar from "./components/Sidebar/Sidebar";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if(!(localStorage.getItem("userLogin"))){
      router.push("/sign-in")
    }
  }, [])

  return (
    <div>
        <Sidebar />
        <Tasks />
    </div>

  )
}
