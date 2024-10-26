import mongoose, { Schema, model } from 'mongoose';
import argon2 from "argon2";
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
        message: 'Invalid email format',
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


userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await argon2.hash(this.password);
      this.password = hash;
      next();
    } catch (error) {
        console.log(error);
        
      next();
    }
  } else {
    next();
  }
});

const User = mongoose.models.User || model<UserType>('User', userSchema);

export default User;
