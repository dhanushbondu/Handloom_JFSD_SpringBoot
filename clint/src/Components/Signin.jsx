import axios from "axios";
import React from "react";
import { useState } from "react";
function Signin(){

const [uname,setUname]=useState("");
const [pwd,setPwd] = useState("");

const handleSubmit =(e)=>{
    e.preventDefault(); 
    const data ={
        uname: uname,
        pwd:pwd
    };
    axios.post("/users/login",data).then((response)=>{
        if (response.status === 200) {
            alert(response.data); 
            setUname("");
            setPwd("");
          }
    })
    .catch((error)=>{
        console.log("username or password incorret");
        alert("username or password incorret");
    })
}

return(
<>
<div className="signin">
    <form onSubmit={handleSubmit}>
    Username: <input type="text" value={uname} onChange={(e)=>setUname(e.target.value)}/>   <br></br>
    Password: <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} /><br></br>
    <button type="submit">Hello</button>
    </form>

</div>
</>

);


}

export default Signin;