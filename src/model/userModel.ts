import mongoose, { Schema } from 'mongoose';
import argon2 from "argon2";

interface User {
  fullName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        // Add more robust email validation if needed
        return /\S+@\S+\.\S+/.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}, { timestamps: true });


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
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;