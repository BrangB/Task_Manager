"use client"
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Tasks from "./tasks/Tasks";

export default function Home() {

  const router = useRouter();
  const pathname = usePathname();
  const isSignInRoute = pathname === '/sign-in' || pathname === "/sign-up";

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
