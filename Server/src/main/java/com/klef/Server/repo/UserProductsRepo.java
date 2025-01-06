package com.klef.server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.server.entity.Products;

@Repository
public interface UserProductsRepo extends JpaRepository<Products, Long> {

}
