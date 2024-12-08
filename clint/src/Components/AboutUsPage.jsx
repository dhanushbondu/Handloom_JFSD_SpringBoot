import React, { useState, useEffect } from "react";
import Navbar from "./Navbar1";
import { motion } from "framer-motion";
import history from '../Images/history_handloom.jpeg'
import craft from '../Images/craftsmanshipImage.jpeg';
import artist1 from '../Images/artisans.png';
// API Calls
const fetchImage = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=YOUR_UNSPLASH_API_KEY`
  );
  const data = await response.json();
  return data[0]?.urls?.regular;
};

const AboutUsPage = () => {
  const [quote, setQuote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [historyImage, setHistoryImage] = useState("");
  const [craftsmanshipImage, setCraftsmanshipImage] = useState("");
  const [artisansImage, setArtisansImage] = useState("");

  useEffect(() => {
    const getContent = async () => {
      // Try to load images from localStorage
      const storedHistoryImage = localStorage.getItem("historyImage");
      const storedCraftsmanshipImage = localStorage.getItem("craftsmanshipImage");
      const storedArtisansImage = localStorage.getItem("artisansImage");
      const storedImageUrl = localStorage.getItem("imageUrl");

      if (storedHistoryImage && storedCraftsmanshipImage && storedArtisansImage && storedImageUrl) {
        // If images are stored in localStorage, use them
        setHistoryImage(storedHistoryImage);
        setCraftsmanshipImage(storedCraftsmanshipImage);
        setArtisansImage(storedArtisansImage);
        setImageUrl(storedImageUrl);
      } else {
        // If not, fetch images from Unsplash and store them in localStorage
        const fetchedHistoryImage = await fetchImage("history of handloom");
        const fetchedCraftsmanshipImage = await fetchImage("handloom craftsmanship");
        const fetchedArtisansImage = await fetchImage("handloom artisans");
        const fetchedImage = await fetchImage("handloom");

        setHistoryImage(fetchedHistoryImage);
        setCraftsmanshipImage(fetchedCraftsmanshipImage);
        setArtisansImage(fetchedArtisansImage);
        setImageUrl(fetchedImage);

        // Store fetched images in localStorage
        localStorage.setItem("historyImage", fetchedHistoryImage);
        localStorage.setItem("craftsmanshipImage", fetchedCraftsmanshipImage);
        localStorage.setItem("artisansImage", fetchedArtisansImage);
        localStorage.setItem("imageUrl", fetchedImage);
      }
    };

    getContent();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        {/* Introduction Section */}
        <motion.section
          style={styles.introSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 style={styles.subtitle}>Welcome to the World of Handloom Fashion 🧵🌍</h2>
          <p style={styles.text}>
            We are passionate about preserving the art of handloom weaving and promoting sustainable fashion.
            Our mission is to showcase the timeless beauty of handwoven fabrics, crafted by skilled artisans from across the world.
          </p>
        </motion.section>

        {/* History of Handloom */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 style={styles.contentTitle}>The History of Handloom 📜</h3>
          <p style={styles.text}>
            Handloom weaving is an ancient art, dating back thousands of years. It has been passed down through generations,
            with techniques honed by skilled artisans to create fabrics of unparalleled quality and beauty.
          </p>
          {historyImage && (
            <img
              src={history}
              alt="History of Handloom"
              style={styles.historyImage}
            />
          )}
        </motion.section>

        {/* Sustainability Fact */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 style={styles.contentTitle}>Why Handloom is Sustainable 🌱</h3>
          <p style={styles.text}>
            Unlike mass-produced fabrics, handloom textiles are crafted with minimal environmental impact.
            The use of natural fibers and sustainable practices ensures that handloom fashion is eco-friendly and supports local communities.
          </p>
        </motion.section>

        {/* Craftsmanship Fact */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h3 style={styles.contentTitle}>The Craftsmanship Behind Handloom 🛠️</h3>
          <p style={styles.text}>
            Each handloom product is a labor of love, made with attention to detail and precision. Artisans spend hours, sometimes days,
            creating each piece, making every product unique and full of character.
          </p>
          {craftsmanshipImage && (
            <img
              src={craft}
              alt="Craftsmanship"
              style={styles.historyImage}
            />
          )}
        </motion.section>

        {/* Artisan Feature */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 style={styles.contentTitle}>Meet the Artisans 🧑‍🎨</h3>
          <p style={styles.text}>
            Our handloom fabrics are crafted by skilled artisans who have dedicated their lives to perfecting the art of weaving.
            We support these artisans by giving them a platform to showcase their craft.
          </p>
          {artisansImage && (
            <img
              src={artist1}
              alt="Artisans"
              style={styles.historyImage}
            />
          )}
        </motion.section>

        {/* Unsplash Image Section */}
        {imageUrl && (
          <motion.section
            style={styles.imageSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
          </motion.section>
        )}

        {/* Product Highlight Section */}
        <motion.section
          style={styles.productSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h3 style={styles.contentTitle}>Our Featured Handloom Products 🧣</h3>
          <p style={styles.text}>
            Our handloom products include beautiful scarves, shawls, garments, and home decor. Each piece is a unique expression of art and craftsmanship.
          </p>
        </motion.section>

        {/* Handloom Benefits */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <h3 style={styles.contentTitle}>Why Choose Handloom ✅</h3>
          <ul style={styles.list}>
            <li>Eco-friendly and sustainable 🌿</li>
            <li>Supports local artisans 🤝</li>
            <li>Timeless designs with a story behind every piece 📖</li>
          </ul>
        </motion.section>

        {/* Quotes Section */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <h3 style={styles.contentTitle}>Fashion Quote 💬</h3>
          <blockquote style={styles.quote}>
            <i>"{quote}"</i>
          </blockquote>
        </motion.section>

        {/* Customer Testimonials */}
        <motion.section
          style={styles.testimonialsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <h3 style={styles.contentTitle}>What Our Customers Say 🌟</h3>
          <p style={styles.testimonial}>
            "I absolutely love my handloom scarf! The quality is outstanding, and it's such a unique piece."
          </p>
          <p style={styles.testimonial}>
            "Handloom fashion is a game-changer. I feel connected to the artisans who created this beautiful piece."
          </p>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          style={styles.contentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h3 style={styles.contentTitle}>Handloom in Numbers 🔢</h3>
          <ul style={styles.list}>
            <li>Over 12 million artisans work in the handloom sector in India alone.</li>
            <li>Handloom contributes to over 15% of the textile industry's GDP.</li>
            <li>Each handwoven product reduces carbon footprint significantly compared to mass-produced fabrics. 🌍</li>
          </ul>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          style={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <h3 style={styles.ctaTitle}>Join the Movement 🙌</h3>
          <button style={styles.ctaButton}>Explore Our Handloom Collection</button>
        </motion.section>
      </div>
    </>
  );
};

const styles = {
  page: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  introSection: {
    textAlign: "center",
    marginBottom: "30px",
  },
  subtitle: {
    fontSize: "2rem",
    color: "#c3253f",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    maxWidth: "800px",
    margin: "0 auto",
  },
  contentSection: {
    marginBottom: "30px",
  },
  contentTitle: {
    fontSize: "1.8rem",
    color: "#c3253f",
  },
  list: {
    listStyleType: "disc",
    marginLeft: "40px",
    fontSize: "1.1rem",
  },
  quote: {
    fontSize: "1.5rem",
    fontStyle: "italic",
    color: "#888",
    marginTop: "20px",
    maxWidth: "800px",
    margin: "20px auto",
  },
  imageSection: {
    textAlign: "center",
    margin: "20px 0",
  },
  historyImage: {
    width: "80%", // Reduce the width
    height: "auto", // Keep proportions
    borderRadius: "8px",
    marginTop: "20px",
    margin: "0 auto", // Center the image horizontally
    display: "block", // Ensures the image is treated as a block element
    maxWidth: "400px", // Limit the maximum size
  },
  image: {
    width: "80%", // Reduce the width
    height: "auto", // Maintain aspect ratio
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "0 auto", // Center the image horizontally
    display: "block", // Ensures the image is treated as a block element
    maxWidth: "400px", // Limit the maximum size
  },
  productSection: {
    marginBottom: "30px",
  },
  testimonialsSection: {
    marginBottom: "30px",
  },
  testimonial: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    color: "#444",
    marginBottom: "20px",
  },
  ctaSection: {
    textAlign: "center",
    marginTop: "40px",
  },
  ctaTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#c3253f",
  },
  ctaButton: {
    padding: "10px 20px",
    backgroundColor: "#c3253f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default AboutUsPage;