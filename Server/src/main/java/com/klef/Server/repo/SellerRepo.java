package com.klef.Server.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.entity.Seller;

@Repository
public interface SellerRepo extends JpaRepository<Seller, String>{

}
