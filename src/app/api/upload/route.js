import { NextResponse } from 'next/server';
import {writeFile} from 'fs/promises';


export async function POST (req, content){

const data= await req.formData();
const imgname = req.headers.get('imgname');



  
    
    const file=data.get('file');
    if(!file){
        return NextResponse.json(req.headers);
    }
    const byteData= await file.arrayBuffer();
    const buffer= Buffer.from(byteData);
    const path= `./public/${imgname}`;
    await writeFile(path, buffer);
    return NextResponse.json({msg:"File uploaded", success:true})

}