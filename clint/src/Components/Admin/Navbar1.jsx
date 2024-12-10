import React from "react";
import './Navbar1.css';
import { Link } from "react-router-dom";

function Navbar1() {
    const username = localStorage.getItem("username");

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">MySite</Link>
            </div>
            <div className="nav-links">
                <Link to="/signinadmin/home">Home</Link>
                <Link to="/">Logout</Link>
            </div>
            {username && (
                <div className="user-info">
                    Welcome, <b>{username} </b>
                </div>
            )}
        </div>
    );
}

export default Navbar1;
