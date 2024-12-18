import React, { useState, useEffect } from "react";
import Navbar from "./Navbar1";
import './HomeMain.css';
import img1 from "../Images/img1.jpeg";
import img2 from "../Images/img5.jpeg";
import img3 from "../Images/img3.jpeg";
import img4 from "../Images/img4.jpeg";
import img5 from "../Images/img10.jpeg";
import img6 from "../Images/img6.jpeg";
import img7 from "../Images/img7.jpeg";
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
    { id: 1, img: img1, title: "Product 1", description: "Beautiful handcrafted product." },
    { id: 2, img: img2, title: "Product 2", description: "Beautiful handcrafted product." },
    { id: 3, img: img3, title: "Product 3", description: "Beautiful handcrafted product." },
    { id: 4, img: img4, title: "Product 4", description: "Beautiful handcrafted product." },
    { id: 5, img: img5, title: "Product 5", description: "Beautiful handcrafted product." },
    { id: 6, img: img6, title: "Product 6", description: "Beautiful handcrafted product." },
    { id: 7, img: img7, title: "Product 7", description: "Beautiful handcrafted product." },
    { id: 8, img: img8, title: "Product 8", description: "Beautiful handcrafted product." },
    { id: 9, img: img9, title: "Product 9", description: "Beautiful handcrafted product." },
    { id: 10, img: img10, title: "Product 10", description: "Beautiful handcrafted product." },
    { id: 11, img: img11, title: "Product 11", description: "Beautiful handcrafted product." },
    { id: 12, img: img12, title: "Product 12", description: "Beautiful handcrafted product." },
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
      <div className="products-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.img} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <a href="/signin" className="btn">
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="promo-section">
        <h2 className="promo-title">Why Choose Handloom?</h2>
        <p className="promo-text">
          Handlooms are more than just fabrics; they represent a legacy of art, culture,
          and craftsmanship passed down through generations. Every piece is a masterpiece,
          crafted with care, using techniques that reflect the heritage of our ancestors.
          By choosing handloom products, you not only embrace sustainable fashion but also
          empower local artisans and preserve their rich traditions. Discover the magic of
          authentic handlooms, where every thread tells a story.
        </p>
        <a href="/signin" className="promo-btn">
          Learn More
        </a>
      </div>
    </>
  );
}

export default HomeMain;
