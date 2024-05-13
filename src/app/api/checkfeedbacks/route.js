import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { Feedback } from "@/models/Feedback";


export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);


    const admin = await isAdmin;

    const url = new URL(req.url);
    const _id =url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Feedback.findById(_id));
    }


    if(admin){
        return Response.json(await Feedback.find());
    }
}