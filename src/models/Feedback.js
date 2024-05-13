import { model, models, Schema } from "mongoose";

const FeedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    questionone: {type: String, required: true},
    answerone: {type: String, required: true},
    questiontwo: {type: String, required: true},
    answertwo: {type: String, required: true},
    questionthree: {type: String, required: true},
    answerthree: {type: String, required: true},
    questionfour: {type: String, required: true},
    answerfour: {type: String, required: true},
  },
  { timestamps: true }
);

export const Feedback = models?.Feedback || model("Feedback", FeedbackSchema);
