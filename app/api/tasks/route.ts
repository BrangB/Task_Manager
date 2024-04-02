import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export const POST = async(req: Request) => {
    try{
        const { user_id, title, description, date, completed, important } = await req.json();
        const task = await prisma?.task.create({
            data: {
                user_id,
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important
            }
        })
        return NextResponse.json({task, message: "Creating Task Successfully", status: 200})
    }catch(err){
        console.log("ERROR CREATING TASKS: ", err)
        return NextResponse.json({error: "Error creating task", status: 500})
    }
}

export const PUT = async(req: Request) => {
    try{

    }catch(err){
        console.log("ERROR UPDATING TASKS: ", err)
        return NextResponse.json({error: "Error updating task", status: 500})
    }
}

export const DELETE = async(req: Request) => {
    try{

    }catch(err){
        console.log("ERROR DELETING TASKS: ", err)
        return NextResponse.json({error: "Error deleting task", status: 500})
    }
}