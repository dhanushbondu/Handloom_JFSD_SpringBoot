import React from "react";
import Navbar from "./Navbar";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa"; // Import icons

function Products() {
    const navigate = useNavigate();

    const addProduct = () => {
        navigate("/signinadmin/home/addproducts");
    };

    const deleteProduct = () => {
        navigate("/signinadmin/home/deleteproducts"); 
    };

    const updateProduct = () => {
        navigate("/signinadmin/home/updateproducts"); 
    };

    return (
        <div className="products-container">
            <Navbar />
            <div className="products-content">
                <h1>Manage Products</h1>
                <div className="product-actions">
                    <button className="action-button add-product" onClick={addProduct}>
                        <FaPlus className="button-icon" /> Add Product
                    </button>
                    <button className="action-button delete-product" onClick={deleteProduct}>
                        <FaTrash className="button-icon" /> Delete Product
                    </button>
                    <button className="action-button update-product" onClick={updateProduct}>
                        <FaEdit className="button-icon" /> Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Products;
