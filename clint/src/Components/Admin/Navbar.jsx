import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaBox, FaEye } from "react-icons/fa"; // Added FaEye for "View Products" icon

function Navbar() {
    const username = localStorage.getItem("username") || "Guest";

    return (
        <div className="side-navbar">
            <div className="logo">
                <Link to="/">MySite</Link>
            </div>
            <div className="nav-links">
                <Link to="/signinadmin/home">
                    <FaHome className="icon" /> Home
                </Link>
                <Link to="/signinadmin/home/products">
                    <FaBox className="icon" /> Products
                </Link>
                <Link to="/signinadmin/home/products/view">
                    <FaEye className="icon" /> View Products {/* New "View Products" link */}
                </Link>
                <Link to="/">
                    <FaSignOutAlt className="icon" /> Logout
                </Link>
            </div>
            <div className="user-info">
                <div className="user-box">
                    Welcome, <b>{username}</b>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
