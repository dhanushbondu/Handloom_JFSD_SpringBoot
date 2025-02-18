import React from "react";
import { Link , useNavigate} from "react-router-dom"; // Import Link for navigation
import { useState } from "react";
import axios from "axios";

import Navbar from './Navbar1';     
function SellerSignin(){
    
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      sname: uname,
      pwd: pwd,
    };
    axios
      .post("/seller/login", data)
      .then((response) => {
        if (response.status === 200) {
          alert("✅ Login Successful!");
          localStorage.setItem("username", response.data);
          setUname("");
          setPwd("");
          navigate("/seller/home");
        }
      })
      .catch((error) => {
        alert("❌ Incorrect username or password!");
      });
  };

  return (
    <>
    <Navbar/>
      <div className="signin">
        <form onSubmit={handleSubmit}>
        <h1 style={{alignItems:"center"}}>Sign-in</h1>
        <b>Username:</b>{" "}
          <input
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
          <br />
          <b>Password:</b>{" "}
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button type="submit">Login</button>
          <br />
          <p>
            Don't have an account?{" "}
            <Link to="/signupseller">Create one</Link>
          </p>
        </form>
      </div>
    </>
  );

}
export default SellerSignin;