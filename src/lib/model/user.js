import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:String,
    age:String,
    img:String,
    address:String
});

export const User= mongoose.models.users || mongoose.model("users", userSchema);