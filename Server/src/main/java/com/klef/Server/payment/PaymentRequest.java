package com.klef.Server.payment;

public class PaymentRequest {

    private double price;  // Price to be paid
    private String uname;  // Username or Customer Name

    // Default constructor
    public PaymentRequest() {}

    // Getter and Setter for price
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Getter and Setter for uname
    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }
}
