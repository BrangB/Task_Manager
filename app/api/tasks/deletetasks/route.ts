import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export const DELETE = async (req: Request) => {
    try{
        const data = await req.json();
        const tasks = await prisma?.task.delete({
            where: {
                id: data.taskId
            }
        })
        return NextResponse.json({tasks, message:"Deleting tasks Successfully", status: 200})
    }catch(err){
        console.log("ERROR DELETING TASKS: ", err)
        return NextResponse.json({error: "Error deleting task", status: 500})
    }
};