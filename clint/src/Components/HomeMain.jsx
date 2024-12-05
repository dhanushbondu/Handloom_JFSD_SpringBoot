import React, { useState, useEffect } from "react";
import Navbar from "./Navbar1";

function HomeMain() {
  const [text, setText] = useState("");
  const message = "Welcome To Handloom Fashion Products!"; // Your welcome message
  const typingSpeed = 100; // Adjust typing speed in milliseconds

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        setText((prev) => message.slice(0, index + 1)); // Update state with the correct substring
        index++;
      } else {
        clearInterval(interval); // Stop typing when the message is complete
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [message]);

  return (
    <>
      <Navbar />
      <div>
        <h1 style={{ color: "#333", fontFamily: "Arial, sans-serif",textAlign: "center", marginTop: "50px",marginRight:"120px"  }}>{text}</h1>
        <p style={{ marginTop: "20px" }}>This is the Main Home Page...</p>
      </div>
    </>
  );
}

export default HomeMain;
