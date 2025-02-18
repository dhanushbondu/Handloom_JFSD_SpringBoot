import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavbar from "./Navbar"; 
import "./Home.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cart, setCart] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/users/products/all");
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        console.log("Adding to cart", { uname: username, productId: product.id }); 
        if (username) {
            try {
                await axios.post("/cart/add", null, { params: { uname: username, productId: product.id } });
                alert(`${product.name} added to cart!`);
                fetchCart(); 
            } catch (err) {
                console.error("Error adding product to cart:", err);
                alert("Failed to add product to cart.");
            }
        } else {
            alert("Please log in to add items to the cart.");
        }
    };
   

    const handleBuyNow = (product) => {
        alert(`Proceeding to checkout for ${product.name}`);
    };

    const fetchCart = async () => {
        if (username) {
            try {
                const response = await axios.get("/cart/items", { params: { username } });
                setCart(response.data);
            } catch (err) {
                console.error("Error fetching cart items:", err);
            }
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
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
                                src={`data:image/jpeg;base64,${product.img}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-id">Id={product.id}</p>
                            <p className="product-description">{product.discription}</p>
                            <p className="product-price">Price: ₹{product.price.toFixed(2)}</p>
                            <p className="product-gender">
                                Gender: {product.gender === "m" ? "Male" : "Female"}
                            </p>
                            <p className="product-seller">Seller: {product.sellerName}</p>
                            {/* Buy Now and Add to Cart Buttons */}
                            <div className="product-buttons">
                                <button
                                    className="buy-now-button"
                                    onClick={() => handleBuyNow(product)}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
