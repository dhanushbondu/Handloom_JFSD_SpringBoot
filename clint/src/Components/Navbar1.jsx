import React from "react";
import './Navbar1.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <a href="#" className="logo-link">Handlooms</a>
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/aboutus">About Us</a>
                <a href="/contactus">Contact Us</a>
                <a href="/signin">Login</a>
                <a href="/signinseller">Seller</a>
                <a href="/signinadmin">Admin</a>

            </div>
        </div>
    );
}

export default Navbar;
