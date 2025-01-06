package com.klef.server.service;

import java.util.List;

import com.klef.server.dto.ProductDTO;

public interface UserProductsService {
    List<ProductDTO> getAllProducts();
}
