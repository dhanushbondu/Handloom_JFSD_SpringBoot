package com.klef.Server.service;

import java.util.List;

import com.klef.Server.entity.Cart;

public interface CartService {
    String addProductCart(Cart cart);
    List<Cart> getCartByUsername(String uname);
    Cart getCartById(Long id);
    void deleteCartItem(String uname, Long id);
    Cart getCartByUnameAndId(String uname, Long id);
    void updateCart(Cart cart);


}
