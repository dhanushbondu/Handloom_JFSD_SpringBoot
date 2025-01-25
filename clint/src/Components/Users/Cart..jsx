import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import './Cart.css';

function Cart() {
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
      if (response.data && response.data.length > 0) {
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

  const handleIncrement = async (itemId) => {
    try {
      const response = await axios.put("/cart/increment", { 
        username: username, 
        id: itemId 
      });
      
      if (response.status === 200) {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      } else {
        setError("Failed to increment quantity. Please try again.");
      }
    } catch (err) {
      setError("Failed to increment quantity. Please try again.");
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      const response = await axios.put("/cart/decrement", { 
        username: username, 
        id: itemId 
      });
      
      if (response.status === 200) {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      } else {
        setError("Failed to decrement quantity. Please try again.");
      }
    } catch (err) {
      setError("Failed to decrement quantity. Please try again.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete("/cart/delete", { params: { uname: username, productId } });
      const updatedItems = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      if (updatedItems.length === 0) {
        setError("Your cart is empty.");
      }
    } catch (err) {
      setError("Failed to delete item. Please try again.");
    }
  };
  const handleBuyNow = async () => {
    try {
      setLoading(true);
  
      // Dynamically pass the amount from the front end
      const amountInPaise = totalPrice ; // Convert to paise for Razorpay
  
      // Redirect URL for Razorpay with dynamic amount
      const paymentUrl = `https://pages.razorpay.com/pl_Pjnc5XHBWzJqh4/view?amount=${amountInPaise}`;
  
      // Redirect to Razorpay payment page
      window.location.href = paymentUrl;
    } catch (err) {
      setError("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
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
            {loading ? (
              <p>Loading...</p>
            ) : cartItems.length === 0 ? (
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
                          <button onClick={() => handleDecrement(item.id)}>-</button>
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                          />
                          <button onClick={() => handleIncrement(item.id)}>+</button>
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
                  <button 
                    className="buy-now-button" 
                    onClick={handleBuyNow}
                    disabled={loading || totalPrice === 0}
                  >
                    {loading ? 'Processing...' : 'Buy Now'}
                  </button>
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






// import React, { useEffect, useState } from "react";
// import Navbar from './Navbar';
// import axios from "axios";
// import './Cart.css';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     if (username) {
//       fetchCartItems();
//     } else {
//       setError("Please log in to view your cart.");
//     }
//   }, [username]);

//   const fetchCartItems = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get("/cart/items", { params: { username } });
//       if (response.data && response.data.length > 0) {
//         setCartItems(response.data);
//         calculateTotalPrice(response.data);
//       } else {
//         setError("Your cart is empty.");
//         setCartItems([]);
//       }
//     } catch (err) {
//       setError("Failed to load cart items. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const handleIncrement = async (itemId) => {
//     try {
//       const response = await axios.put("/cart/increment", { 
//         username: username, 
//         id: itemId 
//       });
      
//       if (response.status === 200) {
//         const updatedItems = cartItems.map((item) =>
//           item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//         );
//         setCartItems(updatedItems);
//         calculateTotalPrice(updatedItems);
//       } else {
//         setError("Failed to increment quantity. Please try again.");
//       }
//     } catch (err) {
//       setError("Failed to increment quantity. Please try again.");
//     }
//   };

//   const handleDecrement = async (itemId) => {
//     try {
//       const response = await axios.put("/cart/decrement", { 
//         username: username, 
//         id: itemId 
//       });
      
//       if (response.status === 200) {
//         const updatedItems = cartItems.map((item) =>
//           item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//         );
//         setCartItems(updatedItems);
//         calculateTotalPrice(updatedItems);
//       } else {
//         setError("Failed to decrement quantity. Please try again.");
//       }
//     } catch (err) {
//       setError("Failed to decrement quantity. Please try again.");
//     }
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete("/cart/delete", { params: { uname: username, productId } });
//       const updatedItems = cartItems.filter((item) => item.id !== productId);
//       setCartItems(updatedItems);
//       calculateTotalPrice(updatedItems);
//       if (updatedItems.length === 0) {
//         setError("Your cart is empty.");
//       }
//     } catch (err) {
//       setError("Failed to delete item. Please try again.");
//     }
//   };

//   const handleBuyNow = async () => {
//     try {
//       const response = await axios.post("/payment/create-order", {
//         username, // Send username only
//         amount: totalPrice, // Send the total amount for the order
//       });
//       const orderId = response.data; // Get order ID from backend response
//       window.location.href = `/payment/checkout?orderId=${orderId}`;
//     } catch (err) {
//       setError("Failed to create order. Please try again.");
//     }
//   };
  
  

//   return (
//     <>
//       <Navbar />
//       <div className="cart-page">
//         <div className="cart-container">
//           <div className="cart-items-section">
//             <h1>Your Cart</h1>
//             {error && <p className="error-message">{error}</p>}
//             {loading ? (
//               <p>Loading...</p>
//             ) : cartItems.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               <div>
//                 <div className="cart-items-list">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="cart-item">
//                       <img src={`data:image/jpeg;base64,${item.img}`} alt={item.name} />
//                       <div className="cart-item-details">
//                         <h3>{item.name}</h3>
//                         <p>₹{item.price}</p>
//                         <div className="quantity-selector">
//                           <button onClick={() => handleDecrement(item.id)}>-</button>
//                           <input
//                             type="number"
//                             value={item.quantity}
//                             readOnly
//                           />
//                           <button onClick={() => handleIncrement(item.id)}>+</button>
//                         </div>
//                         <button className="delete-button" onClick={() => handleDelete(item.id)}>
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="cart-summary">
//                   <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
//                   <button 
//                     className="buy-now-button" 
//                     onClick={handleBuyNow}
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Buy Now'}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;
