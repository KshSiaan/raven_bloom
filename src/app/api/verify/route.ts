import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(request: NextRequest) {
    const {email, password} = await request.json();

    await connectdb();

    const user = await User.findOne({ "email" : email});

    if (user && await argon2.verify(user.password, password)) {        
        cookies().set({name: "user", value: user._id,maxAge:604800});
        redirect("/");
    }else{
        return NextResponse.json({message: "Password doesnt match"}, {status:500})
    }
  
}





    // console.log(user);
    // console.log("and");
    // console.log(await argon2.verify(user.password, password));