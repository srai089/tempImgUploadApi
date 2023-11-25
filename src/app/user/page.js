"use client"     
import "./style.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page(){
    const router= useRouter();
    const [user, setUser]= useState({
        name:"",
        age:"",
        address:""
    });
    // const [file, setFile]= useState(null);
    const onchng = (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const submit = async(e)=>{
        e.preventDefault()
        let resp = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body: JSON.stringify(user)
        });
        resp= await resp.json();
        if(resp.success){
            alert("New user added successfully");
            setUser({
                name:"",
                age:"",
                img:"",
                address:""
            })
        }
    };
    const fileChange = async (e)=>{
        if(!user.name || !user.age || !user.address){
            alert("Enter all fields before uploading image");
            return;
        };
        const imgname= user.name+ Math.floor((Math.random()* Math.random() *1000))+ user.address+ ".jpg";
        setUser({...user, img:imgname});
        try {
           const file= e.target.files[0];
            if(file.type!=="image/jpeg" ){
                alert("Please upload jpeg/jpg file")
                return;
            }
            if(file.size>50000){
                alert("Upload image below 50kb");
                return;
            }
            const data= new FormData();
            data.set('file', file);
            
          
            let resp= await fetch("http://localhost:3000/api/upload",{
                method:"POST",
                headers:{
                   "imgname":imgname 
                },
                body: data
            });
            resp= await resp.json();
           if(resp.success){
            alert("Image uploaded successfully")
           }else{
            alert("Image not uploaded")
           }
        } catch (error) {
            console.log(error);
        }
       

    }
    return(
        <div >
            <h1>Add User</h1>
            <form method="POST" onSubmit={submit}>
            <input className="input" type="text" placeholder="Enter Name" value={user.name} onChange={(e)=>onchng(e)} name="name" />
            <input className="input" type="text" placeholder="Enter Age" value={user.age} onChange={(e)=>onchng(e)} name="age" /> 
            
            <input className="input" type="text" placeholder="Enter Address" value={user.address} onChange={(e)=>onchng(e)} name="address"/>
            <div className="file">

           
            
            <input type="file" name="file" id="file" onChange={(e)=>fileChange(e)}/>
           
            </div>
            <button className="btn" type="submit">Submit</button>
            </form>
            <button className="btn" onClick={()=>router.push('/')}>Home Page</button>
        </div>
    )
}