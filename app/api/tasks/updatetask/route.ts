import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export const POST = async (req: Request) => {
    try {
        const {data} = await req.json();
        
        if (!data.id) {
            throw new Error("Task ID is required.");
        }

        const updatedTask = await prisma?.task.update({
            where: {
                id: data.id,
            },
            data: {
                user_id: data.user_id,
                title: data.title,
                description: data.description,
                date : data.date,
                isCompleted: data.isCompleted,
                isImportant: data.isImportant
            },
        });

        return NextResponse.json({updatedTask, message:"Task updated successfully", status: 200});
    } catch(err) {
        console.log("ERROR UPDATING TASK: ", err);
        return NextResponse.json({error: "Error updating task", status: 500});
    }
};

