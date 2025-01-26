package com.klef.Server.service;

import com.klef.Server.entity.Cart;
import java.util.List;

public interface CartService {
    String addProductCart(Cart cart);
    List<Cart> getCartByUsername(String uname);
    void updateCart(Cart cart);
    Cart getCartById(Long id);
    void deleteCartItem(String uname, Long id);
    Cart getCartByUnameAndId(String uname, Long id);
    
    // New method to delete all cart items for a user
    void deleteAllCartItems(String uname);
}
