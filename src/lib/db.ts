import mongoose from 'mongoose';
import 'dotenv/config';

const DBURI = process.env.DBURI;

export default async function connectdb() {

    console.log(DBURI);
    

  try {
    await mongoose.connect(DBURI as string);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
