import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaBox, FaEye, FaUser, FaCreditCard } from "react-icons/fa"; // Added FaCreditCard for "Payments" icon

function Navbar() {
    const username = localStorage.getItem("username") || "Guest";

    return (
        <div className="side-navbar">
            <div className="logo">
                <Link to="/">Handlooms</Link>
            </div>
            <div className="nav-links">
                <Link to="/seller/home">
                    <FaHome className="icon" /> Home
                </Link>
                <Link to="/seller/home/products">
                    <FaBox className="icon" /> Products
                </Link>
                <Link to="/seller/home/products/view">
                    <FaEye className="icon" /> View Products
                </Link>

                <Link to="/seller/home/payments">
                    <FaCreditCard className="icon" /> Payments {/* New "Payments" link */}
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
