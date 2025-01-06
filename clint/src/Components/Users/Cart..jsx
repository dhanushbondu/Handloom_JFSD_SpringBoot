import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import './Cart.css'; // Ensure this imports the updated CSS

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      fetchCartItems();  
    } else {
      setError("Please log in to view your cart.");
    }
  }, [username]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/cart/items", { params: { username } });
      if (response.data && response.data.length > 0) {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      } else {
        setError("Your cart is empty.");
      }
    } catch (err) {
      setError("Failed to load cart items. Please try again later.");
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put("/cart/update", { id: itemId, quantity: newQuantity });
      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (err) {
      setError("Failed to update quantity. Please try again.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Send both username and productId to delete the cart item
      await axios.post(`/cart/delete`, { username, productId });
      const updatedItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      if (updatedItems.length === 0) {
        setError("Your cart is empty.");
      }
    } catch (err) {
      setError("Failed to delete item. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-items-section">
            <h1>Your Cart</h1>
            {error && <p className="error-message">{error}</p>}

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={`data:image/jpeg;base64,${item.img}`} alt={item.name} />
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <div className="quantity-selector">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value, 10))
                            }
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
