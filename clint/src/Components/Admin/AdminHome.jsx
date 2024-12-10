import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Bar } from "react-chartjs-2"; // Importing the Bar chart
import { Chart as ChartJS } from "chart.js/auto"; // Automatically register chart components
import "./AdminHome.css";
import axios from "axios";

function AdminHome() {
    const [ucount, setUcount] = useState(0);
    const [genderCount, setGenderCount] = useState({ Male: 0, Female: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        // Fetching user count and gender data
        axios
            .get("/users/gender-count") // Assuming you have an endpoint that provides gender counts
            .then((response) => {
                setGenderCount(response.data); // Set gender data (Male, Female)
                setUcount(response.data.Male + response.data.Female); // Set total users
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch users count and gender data. Please try again.");
                setLoading(false);
            });
    }, []);

    const manageusers = () => {
        navigation("/signinadmin/home/manageusers");
    };

    // Chart.js data configuration
    const chartData = {
        labels: ["Male", "Female"], // Gender labels
        datasets: [
            {
                label: "User Distribution by Gender",
                data: [genderCount.Male, genderCount.Female], // Data from the API
                backgroundColor: ["#3498db", "#e74c3c"], // Colors for the bars
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
                        <h3>Active Users</h3>
                        <p>890</p>
                    </div>
                    <div className="card">
                        <h3>Pending Tasks</h3>
                        <p>15</p>
                    </div>
                </div>
                <div className="charts">
                    <div className="chart-box">
                        <h3>Performance Chart</h3>
                        <Bar data={chartData} options={{ responsive: true }} /> {/* Rendering the bar chart */}
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
            <div className="buttons-section">
                <button className="action-button" onClick={manageusers}>
                    Manage Users
                </button>
                <button className="action-button" onClick={() => alert("Products clicked")}>
                    Products
                </button>
                <button className="action-button" onClick={() => alert("Contact Us clicked")}>
                    Contact Us
                </button>
            </div>
        </div>
    );
}

export default AdminHome;
