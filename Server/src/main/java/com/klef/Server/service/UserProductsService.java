package com.klef.Server.service;

import java.util.List;

import com.klef.Server.dto.ProductDTO;

public interface UserProductsService {
    List<ProductDTO> getAllProducts();
}
