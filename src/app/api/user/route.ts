import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { fullName, email, password } = await request.json();

    await connectdb();

    const checkUser = await User.findOne({ "email": email });


    if (checkUser) {
        return NextResponse.json({ messsage: "This email already exist" }, { status: 500 })
    } else {
        const user = await User.create({ fullName, email, password });
        cookies().set({name: "user", value: user._id,maxAge:604800});
        return NextResponse.json({ message: "User created", user: user }, { status: 201 });
    }


}

export async function GET() {
    await connectdb();

    try {
        
        
        const data = await User.findById(cookies().get("user"));
        // const userCookie = cookies().get("user");
        console.log('Cookies:', cookies().getAll()); 
        return NextResponse.json({"user": data}, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

}
// // export async function POST(request:NextRequest) {
// //     const userData = await request.json()
// //     await connectdb();
// // }