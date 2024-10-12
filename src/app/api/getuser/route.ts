import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const rawData = await request.json();

    try {
        await connectdb();

        const data = await User.findById(rawData.value);
            
        return NextResponse.json(data,{status:200});
    } catch (error) {
        return NextResponse.json({error:error},{status:400});
    }   
}