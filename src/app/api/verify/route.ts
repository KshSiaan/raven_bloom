import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

export async function POST(request: NextRequest) {
  try {
    console.log("Request received:", request.method);

    const { email, password } = await request.json();
    await connectdb();

    const user = await User.findOne({ email });

    if (user && (await argon2.verify(user.password, password))) {
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

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/verify:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
