import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface UserType {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isAdmin: boolean;
  newsletter: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserType>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => /\S+@\S+\.\S+/.test(email),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      default: "00",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (this.isModified("password") || this.isNew) {
    try {
      const saltRounds = 10; // Salt rounds for bcrypt
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next(); // Proceed without error
    } catch (error) {
      console.error("Error hashing password:", error);
      next(error as Error); // Pass the error explicitly
    }
  } else {
    next(); // No changes to the password, proceed without error
  }
});

const User = mongoose.models.User || model<UserType>("User", userSchema);

export default User;
