import {NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function GET() {
    try {
        const users = await prisma.user_data.findMany();

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Fetching Users Error", status: 500 });
    }
}
