package com.klef.Server.service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.Server.dto.ProductDTO;
import com.klef.Server.repo.ProductsRepo;

@Service
public class UserProductsServiceLogic implements UserProductsService {

    @Autowired
    private ProductsRepo productsRepo;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productsRepo.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDiscription(product.getDiscription());
            dto.setPrice(product.getPrice());
            dto.setGender(product.getGender());
            dto.setSellerName(product.getSellerName());
            String encodedImg = Base64.getEncoder().encodeToString(product.getImg());
            dto.setImg(encodedImg);
            
            return dto;
        }).collect(Collectors.toList());
    }

    public byte[] decodeImage(String base64Image) {
        return Base64.getDecoder().decode(base64Image);
    }
}
