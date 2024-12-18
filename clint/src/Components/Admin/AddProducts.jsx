import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";
import Navbar from "./Navbar";

function AddProducts() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData to handle file upload
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDescription);
        formData.append("price", productPrice);
        formData.append("image", productImage);

        try {
            // Adjust the URL to your backend endpoint
            const response = await axios.post("http://localhost:8080/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="add-product-container">
            <h1>Add New Product</h1>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        id="description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        id="price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
        </>
    );
}

export default AddProducts;
