import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function SellerDeleteProduct() {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const username = localStorage.getItem('username'); // Assuming that the seller's username is stored in localStorage

  const handleDelete = (e) => {
    e.preventDefault();

    if (!productId) {
      setMessage("⚠️ Please enter a product ID.");
      return;
    }

    axios
      .post(`/products/delete-product/${productId}`, { sellerName: username })
      .then(() => {
        setMessage("✅ Product deleted successfully!");
      })
      .catch(() => {
        setMessage("❌ Failed to delete the product. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="delete-product-container">
        <h1>🗑️ Delete Product</h1>
        <form onSubmit={handleDelete} className="delete-product-form">
          <label htmlFor="productId">🆔 Product ID:</label>
          <input
            type="number"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
          />
          <button type="submit">🗑️ Delete Product</button>
        </form>
        {message && <p className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>}
      </div>
    </>
  );
}

export default SellerDeleteProduct;
