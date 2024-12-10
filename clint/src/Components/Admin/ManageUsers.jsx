import React, { useState, useEffect } from "react";
import Navbar from "./Navbar1";
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

    return (
        <div>
            <Navbar />
            <div className="manage-users">
                <h1>Manage Users</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <table className="users-table">
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
    );
}

export default ManageUsers;
