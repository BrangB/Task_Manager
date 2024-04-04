import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export const POST = async (req: Request) => {
    try {
        const {data} = await req.json();
        
        if (!data.taskId) {
            throw new Error("Task ID is required.");
        }

        const updatedTask = await prisma?.task.update({
            where: {
                id: data.taskId,
            },
            data: {
                isCompleted: !data.isCompleted,
            },
        });

        return NextResponse.json({updatedTask, message:"Task status updated successfully", status: 200});
    } catch(err) {
        console.log("ERROR UPDATING TASK STATUS: ", err);
        return NextResponse.json({error: "Error updating task status", status: 500});
    }
};

