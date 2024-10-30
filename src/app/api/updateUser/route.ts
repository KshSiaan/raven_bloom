import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import User from "@/model/userModel";
import connectdb from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const { id, fullName, email, phoneNumber, confirmPass } =
    await request.json();

  await connectdb();

  try {
    const user = await User.findById(id);

    if (user && (await argon2.verify(user.password, confirmPass))) {
      // Prepare an object with only changed fields
      const updatedFields: Partial<typeof user> = {};

      if (fullName && fullName !== user.fullName)
        updatedFields.fullName = fullName;
      if (email && email !== user.email) updatedFields.email = email;
      if (phoneNumber && phoneNumber !== user.phoneNumber)
        updatedFields.phoneNumber = phoneNumber;

      if (Object.keys(updatedFields).length > 0) {
        await User.findByIdAndUpdate(id, updatedFields);
      }

      return NextResponse.json(
        { message: "Data successfully updated" },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "login failed" }, { status: 403 });
  } catch (error) {
    return NextResponse.json({ message: "login failed" }, { status: 500 });
  }
}
