import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export const POST = async(req: Request) => {
    try{
        const {user_id, complete} = await req.json();
        const tasks = await prisma?.task.findMany({
            where: {
                user_id,
                isCompleted: complete
            }
        })
        return NextResponse.json({tasks, message:"Fetching tasks Successfully", status: 200})
    }catch(err){
        console.log("ERROR GETTING TASKS: ", err)
        return NextResponse.json({error: "Error getting task", status: 500})
    }
}
