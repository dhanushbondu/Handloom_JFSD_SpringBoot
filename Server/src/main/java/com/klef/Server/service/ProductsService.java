package com.klef.server.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.klef.server.dto.ProductDTO;

public interface ProductsService {
    String addProducts(MultipartFile file, String name, String discription, double price, char gender) throws IOException;
    List<ProductDTO> getAllProducts();
    String deleteProducts(long id);
    Long getProductCount();
}
