package com.klef.Server.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.Server.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByUname(String uname);
    Cart findByUnameAndId(String uname, Long id);
    void deleteByUnameAndId(String uname, Long id);
    
}
