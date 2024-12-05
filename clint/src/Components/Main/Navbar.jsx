import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    const username = localStorage.getItem("username");

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">MySite</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
                <Link to="/">Louout</Link>
            </div>
            {username && (
                <div className="user-info">
                    Welcome, <b>{username}</b>
                </div>
            )}
        </div>
    );
}

export default Navbar;
