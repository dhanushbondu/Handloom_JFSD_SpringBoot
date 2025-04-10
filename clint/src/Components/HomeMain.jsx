import React, { useState, useEffect } from "react";
import Navbar from "./Navbar1";
import img1 from "../Images/img1.jpeg";
import img2 from "../Images/img5.jpeg";
import img3 from "../Images/img3.jpeg";
import img4 from "../Images/img4.jpeg";
import img5 from "../Images/img10.jpeg";
import img6 from "../Images/img6.jpeg";
import img8 from "../Images/img13.png";
import img9 from "../Images/img9.jpeg";

import img10 from "../Images/img2.jpeg";
import img11 from "../Images/img11.jpeg";
import img12 from "../Images/img12.jpeg";

function HomeMain() {
  const [text, setText] = useState("");
  const message = "Welcome To Handloom Fashion Products!";
  const typingSpeed = 100;

  // Array of product data
  const products = [
    { id: 1, img: img1, title: "French Baskets" },
    { id: 2, img: img2, title: "Clay Items" },
    { id: 3, img: img3, title: "Joot Fashion" },
    { id: 4, img: img4, title: "Faberic Mats" },
    { id: 5, img: img5, title: "Occasion Wear" },
    { id: 6, img: img6, title: "Cotton Sarees" },
    { id: 8, img: img8, title: "Formal Ware" },
    { id: 9, img: img9, title: "Couple Ware" },
    { id: 10, img: img10, title: "Lehanga" },
    { id: 11, img: img11, title: "Jacquard Silk Fabric" },

    { id: 12, img: img12, title: "Dothi" },

  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        setText((prev) => message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <>
      <Navbar />
      <div>
        <h1
          style={{
            color: "#333",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          {text}
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        {/* Dynamically generate product cards */}
        {products.map((product) => (
          <div className="card" style={{ width: "18rem" }} key={product.id}>
            <img src={product.img} className="card-img-top" alt={product.title} />
            <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "24px", fontWeight: "bold" }}>
  {product.title}
</h5>

              <a href="/signin" className="buy-btn" style={{
                backgroundColor: "#c3253f",
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "bold",
              }}>
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Promotional Section */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          marginTop: "50px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2
          style={{
            color: "#c3253f",
            fontFamily: "'Georgia', serif",
            fontWeight: "bold",
          }}
        >
          Why Choose Handloom?
        </h2>
        <p
          style={{
            color: "#555",
            fontSize: "18px",
            maxWidth: "800px",
            margin: "20px auto",
            lineHeight: "1.6",
          }}
        >
          Handlooms are more than just fabrics; they represent a legacy of art, culture, 
          and craftsmanship passed down through generations. Every piece is a masterpiece, 
          crafted with care, using techniques that reflect the heritage of our ancestors. 
          By choosing handloom products, you not only embrace sustainable fashion but also 
          empower local artisans and preserve their rich traditions. Discover the magic of 
          authentic handlooms, where every thread tells a story.
        </p>
        <a 
          href="/signin"
          className="btn btn-secondary"
          style={{
            backgroundColor: "#c3253f",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Learn More
        </a>
      </div>
    </>
  );
}

export default HomeMain;
