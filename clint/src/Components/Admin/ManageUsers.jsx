import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./ManageUsers.css";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch users from the backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        axios
            .get("/users/userslist") // Update this endpoint if necessary
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch users. Please try again.");
                setLoading(false);
            });
    };

    // Delete a user by uname
    const deleteUser = (uname) => {
        axios
            .delete(`/users/deleteusers/${uname}`)
            .then(() => {
                alert("User deleted successfully!");
                fetchUsers(); // Refresh the user list
            })
            .catch(() => {
                alert("Failed to delete user. Please try again.");
            });
    };

    // Function to download users data as CSV
    const downloadAsCSV = () => {
        const csvData = [
            ["Username", "Email", "Password", "Gender"],
            ...users.map((user) => [
                user.uname,
                user.email,
                user.pwd,
                user.gender,
            ]),
        ].map((row) => row.join(",")).join("\n");

        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");

        csvLink.href = csvUrl;
        csvLink.download = "users_data.csv";
        csvLink.click();
    };

    return (
        <div>
            <Navbar />
            <div className="main-content">
                <div className="manage-users">
                    <h1 className="d-inline-block">Manage Users</h1>
                    <button className="btn btn-primary float-end" onClick={downloadAsCSV}>
                        Download as CSV
                    </button>
                    <div className="clearfix"></div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <table className="users-table mt-4">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="fade-in">
                                        <td>{user.uname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.pwd}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteUser(user.uname)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;