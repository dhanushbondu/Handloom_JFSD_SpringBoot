import React, { useState } from "react";
import "./ContactAdmin.css"; // Add necessary styles
import Navbar from "./Navbar";
function ContactAdmin() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "86ea66dd-13e1-49c5-92fb-04dfc57dde61");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      event.target.reset();
    } else {
      console.log("Error:", data);
      setResult(data.message);
    }
  };

  return (
    <>
    
    <Navbar/>
    <div className="contact-container">
      <div className="form-box">
        <h2>Contact Us</h2>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input type="text" name="name" required />

          <label>Email</label>
          <input type="email" name="email" required />

          <label>Message</label>
          <textarea name="message" required></textarea>

          <button type="submit">Submit</button>
        </form>
        <span className="form-result">{result}</span>
      </div>
    </div>
    </>
  );
}

export default ContactAdmin;
