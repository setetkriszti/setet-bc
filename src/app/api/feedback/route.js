import mongoose from "mongoose";
import { Feedback } from "@/models/Feedback";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {
    name: fullName,
    email,
    message,
    answerone,
    questionone,
    answertwo,
    questiontwo,
    answerthree,
    questionthree,
    answerfour,
    questionfour,
  } = await req.json();
  const feedbackDoc = await Feedback.create({
    name: fullName,
    email,
    message,
    answerone,
    questionone,
    answertwo,
    questiontwo,
    answerthree,
    questionthree,
    answerfour,
    questionfour,
  });
  return Response.json(feedbackDoc);
}
