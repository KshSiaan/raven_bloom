import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/userModel";
import connectdb from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const { id, fullName, email, phoneNumber, confirmPass } =
    await request.json();

  await connectdb();

  try {
    const user = await User.findById(id);

    if (user && bcrypt.compareSync(confirmPass, user.password)) {
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

    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
