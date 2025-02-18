import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    const username = localStorage.getItem("username");

    return (
        <div className="sidenav">
            <div className="logo">
                <Link to="">Handloom Fashion</Link>
            </div>
            <div className="nav-links">
                <Link to="/signin/users/home">
                    🏠 Home
                </Link>

                <Link to="/signin/users/cart">
                    🛒 Cart
                </Link>
                <Link to="/signin/users/payments">
                💳  Payment's
                </Link>
                <Link to="/signin/user/home/contactAdmin">
                📞 Contact Admin
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
