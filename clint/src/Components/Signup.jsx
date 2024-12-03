import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        const user = {
            uname: uname, 
            email: email,
            pwd: pwd
        };
    
        console.log("Sending data:", user); 
    
        axios.post('/users/insert-user', user)
            .then((response) => {
                alert("User added successfully!"); 
                setUname("");
                setEmail("");
                setPwd("");
            })
            .catch((error) => {
                console.error("Error adding user:", error);
                alert("Error adding user.");
            });
    };
    

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username: 
                        <input 
                            type="text" 
                            value={uname} 
                            onChange={(e) => setUname(e.target.value)} 
                        />
                    </label><br />
                    <label>
                        Email: 
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </label><br />
                    <label>
                        Password: 
                        <input 
                            type="password" 
                            value={pwd} 
                            onChange={(e) => setPwd(e.target.value)} 
                        />
                    </label><br />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </>
    );
}

export default Signup;
