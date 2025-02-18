
package com.klef.Server.payment;

import java.util.List;

public class OrderRequest {
    private List<OrderItem> items;
    private double totalAmount;
    private String uname;  // Add uname field here

    // Getters and Setters
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getUname() { return uname; }
    public void setUname(String uname) { this.uname = uname; }
}