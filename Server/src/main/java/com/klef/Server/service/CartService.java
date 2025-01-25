package com.klef.Server.service;

import com.klef.Server.entity.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    String addProductCart(Cart cart);
    List<Cart> getCartByUsername(String uname);
    void updateCart(Cart cart);
    Cart getCartById(Long id);
    void deleteCartItem(String uname, Long id);
    Cart getCartByUnameAndId(String uname, Long id);
    void updateOrderStatus(String uname, Long orderId);
}