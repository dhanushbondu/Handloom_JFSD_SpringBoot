import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faMoneyBill, faImage, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

function SellerAddProduct() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [gender, setGender] = useState("");
    const username = localStorage.getItem('username');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", productImage);
        formData.append("name", productName);
        formData.append("discription", productDescription);
        formData.append("price", productPrice);
        formData.append("gender", gender);
        formData.append("sellerName", username);

        try {
            const response = await axios.post("/products/add-products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(response.data); 
            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setProductImage(null);
            setGender("");
        } catch (error) {
            alert("❌ Failed to add product. Please try again.");
            console.error("Error adding product:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-product-container">
                <h1>Add New Product</h1>
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">
                            <FontAwesomeIcon icon={faTag} /> Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            <FontAwesomeIcon icon={faTag} /> Product Description
                        </label>
                        <textarea
                            id="description"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">
                            <FontAwesomeIcon icon={faMoneyBill} /> Product Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">
                            <FontAwesomeIcon icon={faImage} /> Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="m"
                                checked={gender === "m"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="male">
                                <FontAwesomeIcon icon={faMars} /> Male
                            </label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="f"
                                checked={gender === "f"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="female">
                                <FontAwesomeIcon icon={faVenus} /> Female
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">Add Product</button>
                </form>
            </div>
        </>
    );
}

export default SellerAddProduct;
