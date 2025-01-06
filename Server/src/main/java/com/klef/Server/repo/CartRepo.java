package com.klef.server.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.server.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    
    // Find all cart items by username
    List<Cart> findByUname(String uname);

    // Find a specific cart item by username and product ID
    Cart findByUnameAndId(String uname, Long id);
    
    // Delete a cart item by username and product ID
    void deleteByUnameAndId(String uname, Long id);
}
