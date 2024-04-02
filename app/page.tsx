"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Tasks from "./tasks/Tasks";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if(!(localStorage.getItem("userLogin"))){
      router.push("/sign-in")
    }
  }, [])

  return (
    <div>
      <Tasks />
    </div>

  )
}
