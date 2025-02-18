import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavbar from "./Navbar"; 

function SellerProductView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const username = localStorage.getItem('username'); // Get the username from localStorage

    useEffect(() => {
        if (username) {
            fetchProductsBySeller(username);
        }
    }, [username]); 

    const fetchProductsBySeller = async (sellerName) => {
        try {
            const response = await axios.get(`/products/products-by-seller/${sellerName}`);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <h1>Loading products...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-screen">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className="view-products-container">
            <SideNavbar />
            <div className="products-content">
                <h1>Available Products</h1>
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="product-card" key={product.id}>
                                <img
                                    src={`data:image/jpeg;base64,${product.img}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h2 className="product-name">{product.name}</h2>
                                    <p className="product-id">ID: {product.id}</p>
                                    <p className="product-description">{product.discription}</p>
                                    <p className="product-price">Price: ₹{product.price.toFixed(2)}</p>
                                    <p className="product-gender">
                                        Gender: {product.gender === "m" ? "Male" : "Female"}
                                    </p>
                                    <p className="product-seller">Seller: {product.sellerName}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found for this seller.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SellerProductView;
