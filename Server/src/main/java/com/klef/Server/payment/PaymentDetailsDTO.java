package com.klef.Server.payment;

public class PaymentDetailsDTO {
    private Long productId;
    private String productName;
    private double amount;
    private String razorpayOrderId;

    // Constructor
    public PaymentDetailsDTO(Long productId, String productName, double amount, String razorpayOrderId) {
        this.productId = productId;
        this.productName = productName;
        this.amount = amount;
        this.razorpayOrderId = razorpayOrderId;
    }

    // Getters and Setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }
}
