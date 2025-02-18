package com.klef.Server.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.entity.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products, Long> {
    long countBySellerName(String sellerName);
    List<Products> findBySellerName(String sellerName);
}