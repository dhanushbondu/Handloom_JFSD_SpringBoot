package com.klef.Server.payment;

public class PaymentDetailsDTO {

    private Long productId;
    private String productName;
    private Double amount;
    private String razorpayOrderId;
    private String uname;  // Optional if used in a query

    // Constructor for the first query (without 'uname')
    public PaymentDetailsDTO(Long productId, String productName, Double amount, String razorpayOrderId) {
        this.productId = productId;
        this.productName = productName;
        this.amount = amount;
        this.razorpayOrderId = razorpayOrderId;
    }

    // Constructor for the second query (with 'uname')
    public PaymentDetailsDTO(Long productId, String productName, Double amount, String razorpayOrderId, String uname) {
        this.productId = productId;
        this.productName = productName;
        this.amount = amount;
        this.razorpayOrderId = razorpayOrderId;
        this.uname = uname;
    }

    // Getters and setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }
}