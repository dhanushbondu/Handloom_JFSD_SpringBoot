import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Signup.css';
import Navbar from "./Navbar1";

function Signup() {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState(""); 
    const [gender, setGender] = useState(""); // State to hold gender
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            uname: uname,
            email: email,
            pwd: pwd,
            gender: gender, // Add gender to the user data
        };

        axios.post('/users/insert-user', user)
            .then((response) => {
                if (response.status === 201) {
                    alert("✅ User added successfully!");
                    setUname("");
                    setEmail("");
                    setPwd("");
                    setGender(""); // Clear gender selection
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    // Handle duplicate username
                    alert("❌ Username already exists. Please choose a different one.");
                } else {
                    // Handle other errors
                    alert("❌ Error adding user. Please try again.");
                }
            });
    };

    return (
        <>
            <Navbar/>
            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{alignItems: "center"}}>Sign-up</h1>

                    <label>
                        <b>Username:</b> 
                        <input 
                            name="username"
                            type="text" 
                            value={uname} 
                            onChange={(e) => setUname(e.target.value)} 
                        />
                    </label>

                    <label>
                        <b>Email:</b> 
                        <input 
                            name="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </label>

                    <label>
                        <b>Password:</b>
                        <input 
                            type="password" 
                            value={pwd} 
                            onChange={(e) => setPwd(e.target.value)} 
                        />
                    </label>

                    <div className="gender-container">
                        <label className="gender-label">
                            <input 
                                className="gender-radio"
                                type="radio" 
                                name="gender" 
                                value="m" 
                                checked={gender === "m"}
                                onChange={(e) => setGender(e.target.value)} 
                            />
                            Male
                        </label>
                        <label className="gender-label">
                            <input 
                                className="gender-radio"
                                type="radio" 
                                name="gender" 
                                value="f" 
                                checked={gender === "f"}
                                onChange={(e) => setGender(e.target.value)} 
                            />
                            Female
                        </label>
                    </div>

                    <button type="submit">Signup</button>
                    <br />
                    <p>
                        Already have an account?{" "}
                        <Link to="/signin">Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Signup;
