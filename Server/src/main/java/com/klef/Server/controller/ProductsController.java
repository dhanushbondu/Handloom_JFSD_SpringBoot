package com.klef.Server.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.klef.Server.dto.ProductDTO;
import com.klef.Server.service.ProductsService;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsService productsservice;

    @PostMapping("/add-products")
    public ResponseEntity<String> addProducts(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("discription") String discription,
            @RequestParam("price") double price,
            @RequestParam("gender") char gender,
            @RequestParam("sellerName") String sellerName) {
        try {
            String result = productsservice.addProducts(file, name, discription, price, gender, sellerName);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to add product: " + e.getMessage());
        }
    }

    @GetMapping("/all-products")
    public List<ProductDTO> getAllProducts() {
        return productsservice.getAllProducts();
    }

    @GetMapping("/product-count")
    public long getProductCount() {
    	return productsservice.getProductCount();
    }
    
    @PostMapping("/delete-product/{id}")
    public void deleteProduct(@PathVariable("id") long id) {
        productsservice.deleteProducts(id);
    }

    
}
