import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      fetchCartItems();
    } else {
      setError("Please log in to view your cart.");
    }
  }, [username]);

  const fetchCartItems = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/cart/items", { params: { username } });
      if (response.data.length > 0) {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      } else {
        setError("Your cart is empty.");
        setCartItems([]);
      }
    } catch (err) {
      setError("Failed to load cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, action) => {
    try {
      await axios.put(`/cart/${action}`, { username, id: itemId });
      fetchCartItems(); 
    } catch (err) {
      setError(`Error updating quantity. Please try again.`);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete("/cart/delete", { params: { uname: username, productId: itemId } });
      fetchCartItems(); 
    } catch (err) {
      setError("Error deleting cart item. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    if (cartItems.length === 0) {
      setError("Cart is empty. Add items before proceeding.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderRequest = {
        uname: username, // Ensure uname is included here
        totalAmount: totalPrice,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      const response = await axios.post("/payment/create-order", orderRequest);
      const { id: razorpayOrderId } = response.data;

      const razorpayOptions = {
        key: "rzp_test_jFjFOukkt6cGSG",
        amount: totalPrice * 100, // Amount in paise
        currency: "INR",
        order_id: razorpayOrderId,
        handler: async (paymentResponse) => {
          const verificationResponse = await axios.post("/payment/verify", {
            razorpayOrderId,
            razorpayPaymentId: paymentResponse.razorpay_payment_id,
            razorpaySignature: paymentResponse.razorpay_signature,
          });

          if (verificationResponse.data === "Payment Successful") {
            alert("Payment successful! Your order has been placed.");
            await axios.delete("/cart/delete-all", { params: { uname: username } });
            navigate("/signin/users/home");
          } else {
            setError("Payment verification failed. Please try again.");
          }
        },
        prefill: { name: username },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <h1>Your Cart</h1>
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={`data:image/jpeg;base64,${item.img}`} alt={item.name} />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                      <div className="quantity-selector">
                        <button onClick={() => handleQuantityChange(item.id, "decrement")}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={() => handleQuantityChange(item.id, "increment")}>+</button>
                      </div>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                <button 
                  className="buy-now-button" 
                  onClick={handleBuyNow}
                  disabled={loading || totalPrice === 0}
                >
                  {loading ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
