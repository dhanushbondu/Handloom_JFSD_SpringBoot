package com.klef.Server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.entity.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products, Long> {
}