import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/userModel";
import connectdb from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const { id, currentPass, newPass, confirmPass } = await request.json();
  await connectdb();

  try {
    const user = await User.findById(id);

    // Step 1: Verify current password
    if (!user || !bcrypt.compareSync(currentPass, user.password)) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Step 2: Confirm new passwords match
    if (newPass !== confirmPass) {
      return NextResponse.json(
        { message: "New passwords do not match" },
        { status: 400 }
      );
    }

    // Step 3: Hash new password
    const hashedPassword = bcrypt.hashSync(newPass, 10); // Salt rounds: 10

    // Step 4: Update user password and save
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Password update failed" },
      { status: 500 }
    );
  }
}
