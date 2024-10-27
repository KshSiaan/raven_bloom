import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { fullName, email, password } = await request.json();
    

    await connectdb();

    const checkUser = await User.findOne({ "email": email });


    if (checkUser) {
        return NextResponse.json({ messsage: "This email already exist" }, { status: 500 })
    } else {
        //Create userData
        
        const user = await User.create({ fullName, email, password });
        
        //Create JWT token

        const secretKey = createSecretKey("raven", 'utf-8');

        const JWTData = {
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            isAdmin: user.isAdmin
        }

        const token = await new SignJWT(JWTData).setProtectedHeader({alg:"HS256"}).setExpirationTime("1 day").sign(secretKey)
        
        

        return NextResponse.json({ message: "User created", user: user , token:token}, { status: 201 });
    }
}
// // export async function POST(request:NextRequest) {
// //     const userData = await request.json()
// //     await connectdb();
// // }