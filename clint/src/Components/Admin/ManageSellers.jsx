import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function ManageSellers() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch sellers from the backend
    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = () => {
        setLoading(true);
        axios
            .get("/seller/getAllSellers") // Update this endpoint if necessary
            .then((response) => {
                setSellers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch sellers. Please try again.");
                setLoading(false);
            });
    };

    // Delete a seller by sname
    const deleteSeller = (sname) => {
        axios
            .delete(`/seller/deleteSeller/${sname}`) // Add the correct endpoint for delete
            .then(() => {
                alert("Seller deleted successfully!");
                fetchSellers(); // Refresh the sellers list
            })
            .catch(() => {
                alert("Failed to delete seller. Please try again.");
            });
    };

    // Function to download sellers data as CSV
    const downloadAsCSV = () => {
        const csvData = [
            ["Seller Name", "Email", "Phone Number", "Password"],
            ...sellers.map((seller) => [
                seller.sname,
                seller.email,
                seller.phno,
                seller.pwd,
            ]),
        ].map((row) => row.join(",")).join("\n");

        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");

        csvLink.href = csvUrl;
        csvLink.download = "sellers_data.csv";
        csvLink.click();
    };

    return (
        <div>
            <Navbar />
            <div className="main-content">
                <div className="manage-sellers">
                    <h1 className="d-inline-block">Manage Sellers</h1>
                    <button className="btn btn-primary float-end" onClick={downloadAsCSV}>
                        Download as CSV
                    </button>
                    <div className="clearfix"></div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <table className="sellers-table mt-4">
                            <thead>
                                <tr>
                                    <th>Seller Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.map((seller, index) => (
                                    <tr key={index} className="fade-in">
                                        <td>{seller.sname}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.phno}</td>
                                        <td>{seller.pwd}</td>
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteSeller(seller.sname)}
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

export default ManageSellers;
