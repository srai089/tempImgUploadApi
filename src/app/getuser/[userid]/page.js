"use client"
import "./style.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



export default function Page(props){
    const router= useRouter();
    const [data, setData]=useState({
        name:"",
        age:"",
        address:""
    })
    const _id=props.params.userid;

    const getUser = async ()=>{
        let resp= await fetch(`http://localhost:3000/api/user/${_id}`);
        resp= await resp.json();
        console.log(resp)
        setData({
            name:resp.result.name,
            age:resp.result.age,
            address:resp.result.address
        })
    }

    useEffect(()=>{
        getUser()
    },[])
   const updateUser = async ()=>{
    let resp= await fetch(`http://localhost:3000/api/user/${_id}`,{
        method:"PUT",
        body:JSON.stringify(data)
    },
    );
    resp= await resp.json();
    if(resp.success){
        alert("User Updated Successfully");
        router.push('/getuser');
        router.refresh();
    }
   }
    return (
        <div>
            <h1>Update User</h1>
            <input type="text" placeholder="Enter updeted Name" value={data.name} onChange={(e)=>setData({...data, name:e.target.value})} />
            <input type="text" placeholder="Enter updeted Age" value={data.age} onChange={(e)=>setData({...data, age:e.target.value})} />
            <input type="text" placeholder="Enter updeted Address" value={data.address} onChange={(e)=>setData({...data, address:e.target.value})} />
            <button onClick={updateUser}>Update</button>
            <button onClick={()=>router.push('/getuser')}>Back to users List</button>
        </div>
    )
}