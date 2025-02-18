import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./UpdateProductPrice.css";

function UpdateProductPrice() {
  const [productId, setProductId] = useState("");
  const [newPrice, setNewPrice] = useState("");  
  const [message, setMessage] = useState("");

  const handleUpdatePrice = (e) => {
    e.preventDefault();
    if (!productId || !newPrice) {
      setMessage("⚠️ Please enter both product ID and new price.");
      return;
    }

    // Send PUT request to update the product price
    axios
      .put(`/products/update-product-price/${productId}`, null, {
        params: { price: newPrice },
      })
      .then(() => {
        setMessage("✅ Product price updated successfully!");
      })
      .catch(() => {
        setMessage("❌ Failed to update the product price. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="update-product-price-container">
        <h1>💸 Update Product Price</h1>
        <form onSubmit={handleUpdatePrice} className="update-product-price-form">
          <label htmlFor="productId">🆔 Product ID:</label>
          <input
            type="number"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
          />

          <label htmlFor="newPrice">💰 New Price:</label>
          <input
            type="number"
            id="newPrice"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Enter new price"
          />

          <button type="submit">💸 Update Price</button>
        </form>
        {message && <p className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>}
      </div>
    </>
  );
}

export default UpdateProductPrice;
