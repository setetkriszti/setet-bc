import { User } from "../../../models/user.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL); 
  
  const pass = body.password;
    if (!pass?.length || pass.length < 8) {
      new Error('A jelszónak legalább 8 karaktert kell tartalmaznia!');
      return false;
    }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
  body.password = hashedPassword;

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
