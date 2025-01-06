import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    const username = localStorage.getItem("username");

    return (
        <div className="sidenav">
            <div className="logo">
                <Link to="/">MySite</Link>
            </div>
            <div className="nav-links">
                <Link to="/signin/users/home">
                    🏠 Home
                </Link>

                <Link to="/signin/users/cart">
                    🛒 Cart
                </Link>

                <Link to="/contactus">
                    ✉️ Contact Us
                </Link>
                <Link to="/signin/users/about">
                    ℹ️ About Us
                </Link>
                
                <Link to="/">
                    🚪 Logout
                </Link>
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
