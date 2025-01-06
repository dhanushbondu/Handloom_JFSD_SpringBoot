package com.klef.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.server.dto.ProductDTO;
import com.klef.server.service.UserProductsService;

@RestController
@RequestMapping("/users")
public class UserProductsController {

    @Autowired
    private UserProductsService userProductsService;

    @GetMapping("/products/all")
    public List<ProductDTO> getAllProducts() {
        return userProductsService.getAllProducts();
    }
}
