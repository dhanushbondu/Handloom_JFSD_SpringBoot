import React from "react";
import { useState } from "react";
import axios from "axios";
function Contactus(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [msg,setMsg]=useState("");
    const [responseMessage, setResponseMessage] = useState("");  // To store the response message

    const handelFunctionality=(e)=>{
        e.preventDefault();
        const data={
            name:name,
            email:email,
            msg:msg
        };
        axios.post("/users/contactus",data).then((response)=>{
            if (response.status === 200) {
                alert(response.data)
                setResponseMessage("Thank you for contacting us! We have received your message.");
                setName("");  // Clear form fields
                setEmail("");
                setMsg("");
            } else {
                setResponseMessage("There was an error while submitting your message. Please try again.");
            }
        }).catch((error)=>{
            console.log(error);
            setResponseMessage("Error submitting your message. Please try again.");

        })


    }

    return(
        <>
            <div>
                <form onSubmit={handelFunctionality}>
                    Name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)} /><br></br>
                    Email: <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
                    Contact-Us: <input type="text" value={msg}  onChange={(e)=>setMsg(e.target.value)}/><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>

    );
}
export default Contactus;