package com.klef.Server.repo;

import com.klef.Server.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByUname(String uname);
    Cart findByUnameAndId(String uname, Long id);
    void deleteByUnameAndId(String uname, Long id);

    
}