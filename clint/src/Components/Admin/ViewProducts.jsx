import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavbar from "./Navbar"; // Correct the import to your side navbar component
import "./ViewProducts.css";

function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/products/all-products"); // Ensure correct API endpoint
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
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
                                src={`data:image/jpeg;base64,${product.img}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.discription}</p>
                            <p className="product-price">Price: ₹{product.price.toFixed(2)}</p>
                            <p className="product-gender">
                                Gender: {product.gender === "m" ? "Male" : "Female"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewProducts;
