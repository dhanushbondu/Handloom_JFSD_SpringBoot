import axios from "axios";
import React from "react";
import './Signin.css';
import { Link , useNavigate} from "react-router-dom"; // Import Link for navigation
import { useState } from "react";

function Signin() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      uname: uname,
      pwd: pwd,
    };
    axios
      .post("/users/login", data)
      .then((response) => {
        if (response.status === 200) {
          alert("✅ Login Successful!");
          localStorage.setItem("username", response.data);
          setUname("");
          setPwd("");
          navigate("/signin/home");
        }
      })
      .catch((error) => {
        alert("❌ Incorrect username or password!");
      });
  };

  return (
    <>
      <div className="signin">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
            <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signin;
