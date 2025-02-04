import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Payment.css';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username');

        // Fetch payment data from the backend
        const fetchPayments = async () => {
            try {
                const response = await fetch(`/payment/get-payment-details/${username}`);

                // Check if response is valid and JSON is expected
                if (!response.ok) {
                    throw new Error(`Failed to fetch payments: ${response.statusText}`);
                }

                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setPayments(data);  // Set the fetched data to state
                } else {
                    setPayments([]); // If the response is not JSON, set payments as an empty array
                }

                setLoading(false);   // Stop loading
            } catch (err) {
                setError(err.message); // Handle error if any
                setLoading(false); // Stop loading
                setPayments([]); // If there's an error, show empty table
            }
        };

        fetchPayments();
    }, []); // Empty dependency array ensures this runs once on component mount

    // Function to download payments data as CSV
    const downloadAsCSV = () => {
        const csvData = [
            ["Razorpay Order ID", "Product ID", "Product Name", "Amount"],
            ...payments.map((payment) => [
                payment.razorpayOrderId,
                payment.productId,
                payment.productName,
                payment.amount,
            ]),
        ].map((row) => row.join(",")).join("\n");

        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");

        csvLink.href = csvUrl;
        csvLink.download = "payments_data.csv";
        csvLink.click();
    };

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
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr>
                                <th>Razorpay Order ID</th>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Error: {error}
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No payments found for this user.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.razorpayOrderId}>
                                        <td>{payment.razorpayOrderId}</td>
                                        <td>{payment.productId}</td>
                                        <td>{payment.productName}</td>
                                        <td>{payment.amount}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Payments;
