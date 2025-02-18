import React, { useState } from "react";
import Navbar from "./Navbar1";
import axios from "axios";
import { Link } from "react-router-dom";
import './SellerSignup.css';

function SellerSignup() {

    const [sname, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [phno, setPhno] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");  // To store error message

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic front-end validation
        if (!sname || !email || !phno || !pwd) {
            setError("All fields are required!");
            return;
        }

        const data = {
            sname: sname,
            email: email,
            phno: phno,
            pwd: pwd
        };

        axios.post("/seller/insert", data)
            .then((response) => {
                if (response.status === 201) {
                    // Handle success case
                    alert("✅ Signup Successful!");
                    localStorage.setItem("username", response.data);
                    setSname("");
                    setEmail("");
                    setPhno("");
                    setPwd("");
                    setError("");  // Clear any previous error
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    // Username already exists
                    setError("Username already exists. Please choose a different one.");
                } else {
                    setError("An error occurred during signup. Please try again.");
                }
            });
    };

    return (
        <>
            <Navbar />
            <div className="signin">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: "center" }}>Sign-Up</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error message */}
                    <div>
                        <label><b>Username:</b></label>
                        <input
                            type="text"
                            value={sname}
                            onChange={(e) => setSname(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label><b>Email:</b></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label><b>Phone Number:</b></label>
                        <input
                            type="text"
                            value={phno}
                            onChange={(e) => setPhno(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label><b>Password:</b></label>
                        <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Signup</button>
                    <br />
                    <p>
                        Already have an account?{" "}
                        <Link to="/signinseller">Sign in</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default SellerSignup;
