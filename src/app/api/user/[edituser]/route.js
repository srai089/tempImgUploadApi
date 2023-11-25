import { NextResponse } from "next/server";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";



export async function GET(req, content){
const _id= content.params.edituser;

try {
    let data= await User.findOne({_id});

    return NextResponse.json({result:data})
} catch (error) {
    console.log(error);
}
}


export async function PUT(req, contain){
const payload= await req.json();
const _id= contain.params.edituser;
try {
    await mongoose.connect(process.env.DBCONNECT);
    const resp= await User.findByIdAndUpdate(_id, payload, {new:true})
    return NextResponse.json({result:resp, success:true})
} catch (error) {
    console.log(error);
}
    
}

