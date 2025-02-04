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
    void deleteAllCartItems(String uname);
    public List<Cart> getCartByUsername1(String uname);
}
