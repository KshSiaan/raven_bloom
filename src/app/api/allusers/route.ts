import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { NextResponse } from "next/server";



export async function GET() {
    await connectdb();

    try {
        const data = await User.find().select("email fullName createdAt");
        return NextResponse.json({data:data}, {status:200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}