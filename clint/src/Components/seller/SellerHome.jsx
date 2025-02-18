import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function SellerHome() {
    const [pcount, setPcount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const sellerName = localStorage.getItem("username") || "defaultSeller";

    useEffect(() => {
        setLoading(true);
        setError("");

        axios.get(`/products/product-Scount/${sellerName}`)
            .then((response) => {
                console.log("Product Count Response:", response.data);
                setPcount(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product count:", err);
                setError("Failed to fetch data. Please try again.");
                setLoading(false);
            });
    }, [sellerName]);

    return (
        <div className="seller-dashboard">
            <Navbar />
            <div className="dashboard-content">
                <h1>Welcome, {sellerName}!</h1>
                <div className="stats-cards">
                    <div className="card">
                        <h3>Total Products</h3>
                        {loading ? <p>Loading...</p> : <p>{pcount}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerHome;
