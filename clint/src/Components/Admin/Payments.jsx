import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Payments.css';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the username from localStorage
        const username = localStorage.getItem('username');

        // Fetch payment data from the backend
        const fetchPayments = async () => {
            try {
                const response = await fetch(`/payment/get-all-payments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                const data = await response.json();
                setPayments(data);  // Set the fetched data to state
                setLoading(false);   // Stop loading
            } catch (err) {
                setError(err.message); // Handle error if any
                setLoading(false);
            }
        };

        fetchPayments();
    }, []); // Empty dependency array ensures this runs once on component mount

    // Function to download payments data as CSV
    const downloadAsCSV = () => {
        const csvData = [
            ["Razorpay Order ID", "Amount", "Status", "Username"],
            ...payments.map((payment) => [
                payment.razorpayOrderId,
                payment.amount,
                payment.status,
                payment.uname,
            ]),
        ].map((row) => row.join(",")).join("\n");

        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");

        csvLink.href = csvUrl;
        csvLink.download = "payments_data.csv";
        csvLink.click();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="container mt-4">
                    <h3 className="d-inline-block">User Payments</h3>
                    <button className="btn btn-primary float-end" onClick={downloadAsCSV}>
                        Download as CSV
                    </button>
                    <div className="clearfix"></div>
                    {payments.length === 0 ? (
                        <p>No payments found for this user.</p>
                    ) : (
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Razorpay Order ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{payment.razorpayOrderId}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.status}</td>
                                        <td>{payment.uname}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Payments;