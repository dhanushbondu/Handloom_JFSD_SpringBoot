package com.klef.server.dto;

public class DeleteCartItemRequest {
    private String username;  // Username field
    private Long id;          // Product ID field

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
