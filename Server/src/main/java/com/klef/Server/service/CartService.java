package com.klef.server.service;

import java.util.List;

import com.klef.server.entity.Cart;

public interface CartService {
    String addProductCart(Cart cart);
    List<Cart> getCartByUsername(String uname);
    void updateCart(Cart cart);
    Cart getCartById(Long id);
    void deleteCartItemById(Long id);
    void deleteCartItemByUsernameAndProductId(String username, Long productId); // Method to delete by username and productId
}
