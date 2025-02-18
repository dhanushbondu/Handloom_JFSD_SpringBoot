package com.klef.Server.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.klef.Server.dto.ProductDTO;

public interface ProductsService {
    String addProducts(MultipartFile file, String name, String discription, double price, char gender, String sellerName) throws IOException;
    List<ProductDTO> getAllProducts();
    String deleteProducts(long id);
    Long getProductCount();
    Long getProductCountSeller(String sellerName);
    List<ProductDTO> getProductsBySellerName(String sellerName);
    String updateProductPrice(Long productId, double newPrice); 

}