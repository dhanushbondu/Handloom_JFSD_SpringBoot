import axios from "axios";
import { React, useState } from "react";
import './SigninAdmin.css';
import Navbar from "./Navbar1";

function SigninAdmin() {
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();  // Prevent page reload

        const data = {
            uname: uname,
            pwd: pwd,
        };

        // Make the POST request to the backend
        axios.post("/admin/adminlogin", data)
            .then((response) => {
                // Check if the login is successful (status 200)
                if (response.status === 200) {
                    alert("✅ Login Successful!");
                    setUname("");  // Clear username field
                    setPwd("");    // Clear password field
                }
            })
            .catch((exception) => {
                // If an error occurs, alert the user
                alert("❌ Login failed. Please check your credentials.");
            });
    };

    return (
        <>
        <Navbar/>
            <div className="signin"> 
                <form onSubmit={handelSubmit}>
                <h1 style={{alignItems:"center"}}>Admin-Login</h1>

                    <label>
                        Name:
                        <input
                            type="text"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </label>
                    <br /><br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default SigninAdmin;
