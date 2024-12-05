import React from "react";
import './Navbar1.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <a href="#" className="logo-link">Handlooms</a>
            </div>
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#aboutus">About Us</a>
                <a href="#contactus">Contact Us</a>
                <a href="/signin">Login</a>
            </div>
        </div>
    );
}

export default Navbar;
