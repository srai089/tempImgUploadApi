//server componenet
import "./style.css";
import Link from "next/link";
import Image from "next/image";





const userDetail = async()=>{
    let resp= await fetch(`${process.env.HOST}/api/user`, {cache:"no-cache"});
    resp = await resp.json();
    return resp.msg;
}

export default async function Page(){

    const data= await userDetail();
 
    return(
        <div>
            <h1>All users in table</h1>
            <table border="1">
                <thead>
                    <tr><td>S.No.</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Address</td>
                        <td>Photo</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, ind)=> (
                            <tr key={ind}>
                                <td>{ind+1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.address}</td>
                                <td> <Image src={"/" + item.img} alt="img" width="50" height="60"/> </td>
                                <td><Link href={"/getuser/"+item._id}>Edit</Link></td>
                            </tr>
                        )
                          
                        )
                    }
                </tbody>
            </table>
            <br />
            <br />
            <Link href="/"><button>Home</button></Link>
        </div>
    )
}