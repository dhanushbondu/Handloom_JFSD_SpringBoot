package com.klef.Server.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private String discription;
    private double price;
    private char gender;
    private String sellerName;
    private String img;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDiscription() { return discription; }
    public void setDiscription(String discription) { this.discription = discription; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public char getGender() { return gender; }
    public void setGender(char gender) { this.gender = gender; }

    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
}