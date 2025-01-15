import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  await connectdb();

  try {
    const user = await User.findOne({ email: email });

    if (user !== null && bcrypt.compareSync(password, user.password)) {
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
        { message: "Password doesn't match" },
        { status: 401 } // 401 Unauthorized
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
