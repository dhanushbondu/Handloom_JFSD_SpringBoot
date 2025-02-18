import React from "react";
import Navbar from "./Navbar";
// import './SellerProducts.css';
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 

function SellerProducts() {
    const navigate = useNavigate();

    const addProduct = () => {
        navigate("/seller/home/addproducts");
    };

    const deleteProduct = () => {
        navigate("/seller/home/deleteproducts"); 
    };

    const updateProduct = () => {
        navigate("/seller/home/updateproducts"); 
    };

    return (
        <div className="seller-products-container">
            <Navbar />
            <div className="products-content">
                <h1>Manage Seller Products</h1>
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

export default SellerProducts;
