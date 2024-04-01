import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request){
    try {
        const { email, password } = await req.json();
        const userId = uuidv4();

        const user = await prisma?.user_data.create({
            data:{
                user_id: userId,
                email,
                password
            }
        })
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error creating user:", error);
        // Return an error response with status code 500
        return NextResponse.json({ error: "Error creating user", status: 500 });
    }
}
