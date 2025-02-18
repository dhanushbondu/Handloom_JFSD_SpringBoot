package com.klef.Server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String discription;
    double price;
    char gender;
    String sellerName;
    
    @Lob
    byte[] img;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDiscription() {
        return discription;
    }
    public void setDiscription(String discription) {
        this.discription = discription;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public char getGender() {
        return gender;
    }
    public void setGender(char gender) {
        this.gender = gender;
    }
    public String getSellerName() {
        return sellerName;
    }
    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }
    public byte[] getImg() {
        return img;
    }
    public void setImg(byte[] img) {
        this.img = img;
    }
}