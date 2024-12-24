import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./AdminHome.css";
import axios from "axios";

function AdminHome() {
    const [ucount, setUcount] = useState(0);
    const [pcount, setPcount] = useState(0);
    const [genderCount, setGenderCount] = useState({ Male: 0, Female: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");

        Promise.all([
            axios.get("/users/gender-count"),
            axios.get("/products/product-count"),
        ])
            .then(([genderResponse, productResponse]) => {
                const genderData = genderResponse.data;
                const productData = productResponse.data;

                setGenderCount(genderData);
                setUcount(genderData.Male + genderData.Female);
                setPcount(productData);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch data. Please try again.");
                setLoading(false);
            });
    }, []);

    const chartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "User Distribution by Gender",
                data: [genderCount.Male, genderCount.Female],
                backgroundColor: ["#3498db", "#e74c3c"],
                borderColor: ["#2980b9", "#c0392b"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="admin-dashboard">
            <Navbar />
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                <div className="stats-cards">
                    <div className="card">
                        <h3>Total Users</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : (
                            <p>{ucount}</p>
                        )}
                    </div>
                    <div className="card">
                        <h3>Total Products</h3>
                        {loading ? <p>Loading...</p> : <p>{pcount}</p>}
                    </div>
                    <div className="card">
                        <h3>Pending Tasks</h3>
                        <p>15</p>
                    </div>
                </div>
                <div className="charts">
                    <div className="chart-box">
                        <h3>User Distribution Chart</h3>
                        <Bar data={chartData} options={{ responsive: true }} />
                    </div>
                    <div className="chart-box">
                        <h3>Recent Activities</h3>
                        <ul>
                            <li>User A updated profile</li>
                            <li>Task X was completed</li>
                            <li>New user registration</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
