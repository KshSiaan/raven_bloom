import connectdb from "@/lib/db";
import User from "@/model/userModel";
// import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  await connectdb();

  try {
    const user = await User.findOne({ email: email });

    console.log(user);

    if (user !== null && (await argon2.verify(user.password, password))) {
      const secretKey = createSecretKey("raven", "utf-8");

      const JWTData = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = await new SignJWT(JWTData)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1 day")
        .sign(secretKey);

      return NextResponse.json({ token: token }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Password doesnt match" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "login failed" }, { status: 500 });
  }
}

// console.log(user);
// console.log("and");
// console.log(await argon2.verify(user.password, password));
