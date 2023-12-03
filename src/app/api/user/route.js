import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/lib/model/user";


export async function GET() {
    try {
        await mongoose.connect(process.env.DBCONNECT);
        const resp= await User.find().sort("age:1");
        return NextResponse.json({ msg: resp, success:true })
    } catch (e) {
        console.log(e);
    }    
}

export async function POST(req, content) {
    
    let data= await req.json();
   
    const userData= new User(data)
 
    try {
        await mongoose.connect(process.env.DBCONNECT);
       
        const resp= await userData.save();
        return NextResponse.json({ msg: resp, success:true })
    } catch (e) {
        console.log(e);
    }    
}