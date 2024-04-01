import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function POST(req: Request){
    try {
        const {data} = await req.json(); // Assuming you're passing email as a query parameter

        const user  = await prisma.user_data.findMany({
            where: {
                email: data.email
            }
        }as any);

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error finding user:", error);
        // Return an error response with status code 500
        return NextResponse.json({ error: "Finding User Error", status: 500 });
    }
}