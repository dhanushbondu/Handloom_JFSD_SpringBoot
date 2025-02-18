package com.klef.Server.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.klef.Server.dto.ProductDTO;
import com.klef.Server.entity.Products;
import com.klef.Server.repo.ProductsRepo;

@Service
public class ProductsServiceLogic implements ProductsService {

    @Autowired
    private ProductsRepo productsrepo;

    @Override
    public String addProducts(MultipartFile file, String name, String discription, double price, char gender, String sellerName) throws IOException {
        try {
            Products p = new Products();
            p.setName(name);
            p.setDiscription(discription);
            p.setPrice(price);
            p.setGender(gender);
            p.setSellerName(sellerName);
            p.setImg(file.getBytes());
            productsrepo.save(p);
            return "Product added successfully!";
        } catch (Exception e) {
            return "Failed to add product: " + e.getMessage();
        }
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productsrepo.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDiscription(product.getDiscription());
            dto.setPrice(product.getPrice());
            dto.setGender(product.getGender());
            dto.setSellerName(product.getSellerName());
            dto.setImg(Base64.getEncoder().encodeToString(product.getImg()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public String deleteProducts(long id) {
        if (productsrepo.existsById(id)) {
            productsrepo.deleteById(id);
            return "Product deleted successfully.";
        }
        return "Product does not exist.";
    }

    @Override
    public Long getProductCount() {
        return productsrepo.count();
    }
    
    @Override
    public Long getProductCountSeller(String sellerName) {
        if (sellerName != null && !sellerName.isEmpty()) {
            return productsrepo.countBySellerName(sellerName);
        }
        return 0L;
    }
    @Override
    public String updateProductPrice(Long productId, double newPrice) {
        try {
            Products product = productsrepo.findById(productId).orElse(null);
            if (product != null) {
                product.setPrice(newPrice);
                productsrepo.save(product);
                return "Product price updated successfully!";
            } else {
                return "Product not found!";
            }
        } catch (Exception e) {
            return "Failed to update product price: " + e.getMessage();
        }
    }
    
    @Override
    public List<ProductDTO> getProductsBySellerName(String sellerName) {
        return productsrepo.findBySellerName(sellerName).stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDiscription(product.getDiscription());
            dto.setPrice(product.getPrice());
            dto.setGender(product.getGender());
            dto.setSellerName(product.getSellerName());
            dto.setImg(Base64.getEncoder().encodeToString(product.getImg()));
            return dto;
        }).collect(Collectors.toList());
    }


}