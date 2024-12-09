import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./AdminHome.css";
import axios from "axios";

function AdminHome() {
    const [ucount, setUcount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("/users/users-count") // Assuming the proxy is set
            .then((response) => {
                setUcount(response.data); // Directly set the count since it's returned as a number
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch users count. Please try again.");
                setLoading(false);
            });
    }, []);

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
                        <p>[Insert Chart Here]</p>
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
