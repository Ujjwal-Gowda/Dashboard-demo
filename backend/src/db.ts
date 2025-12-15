import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGO_URI!;
export async function Connectiondb() {
  try {
    await mongoose.connect(URI);
    console.log("mongodb connected ");
  } catch (error) {
    console.log("mongodb connection failed ", error);
  }
}
