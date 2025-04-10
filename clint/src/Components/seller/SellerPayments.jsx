import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function SellerPayments() {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sellerName = localStorage.getItem("username");

        if (sellerName) {
            axios
                .get(`/payment/get-payments-by-seller/${sellerName}`)
                .then((response) => {
                    setPaymentDetails(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching payment details", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            console.log("Seller name not found in localStorage");
        }
    }, []);

    return (
        <div className="app-container">
            {/* Side Navbar */}
            <div className="side-navbar">
                <div className="logo">Your Logo</div>
                <div className="nav-links">
                    <a href="/dashboard" className="active">
                        Dashboard
                    </a>
                    <a href="/seller-payments">Payments</a>
                    <a href="/orders">Orders</a>
                    {/* Add more links as needed */}
                </div>
                <div className="user-info">
                    <div className="user-box">
                        <p>Seller: {localStorage.getItem("sellerName")}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <Navbar />
                <div className="payments-section">
                    {loading ? (
                        <div>Loading payment details...</div>
                    ) : (
                        <div>
                            <h2>Payment Details</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Amount</th>
                                        <th>Order ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentDetails.length > 0 ? (
                                        paymentDetails.map((payment) => (
                                            <tr key={payment.productId}>
                                                <td>{payment.productId}</td>
                                                <td>{payment.productName}</td>
                                                <td>{payment.amount}</td>
                                                <td>{payment.razorpayOrderId}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No payment details found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SellerPayments;
