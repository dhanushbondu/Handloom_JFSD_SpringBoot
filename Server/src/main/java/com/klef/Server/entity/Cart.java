package com.klef.Server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    private Long id; // Product ID
    private String uname; // Username
    private String name; // Product name
    private double price; // Product price
    private int quantity; // Cart quantity

    @Lob
    private byte[] img; // Product image

    private String razorpayOrderId; // Razorpay Order ID (for payment association)
    private String paymentStatus; // Payment status (e.g., "created", "paid")
    private String productIds; // Comma-separated list of product IDs

    // Getters and Setters
    public Long getSid() { return sid; }
    public void setSid(Long sid) { this.sid = sid; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUname() { return uname; }
    public void setUname(String uname) { this.uname = uname; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public byte[] getImg() { return img; }
    public void setImg(byte[] img) { this.img = img; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getProductIds() { return productIds; }
    public void setProductIds(String productIds) { this.productIds = productIds; }
}
