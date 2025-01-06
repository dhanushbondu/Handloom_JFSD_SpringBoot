package com.klef.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.klef.server.entity.Cart;
import com.klef.server.repo.CartRepo;

@Service
public class CartServiceLogic implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Override
    @Transactional
    public String addProductCart(Cart cart) {
        try {
            // Check if the product already exists in the cart for this user
            Cart existingCartItem = cartRepo.findByUnameAndId(cart.getUname(), cart.getId());

            if (existingCartItem != null) {
                // If the product already exists, update the quantity
                existingCartItem.setQuantity(existingCartItem.getQuantity() + cart.getQuantity());
                cartRepo.save(existingCartItem);  // Update the existing cart item
                return "Product quantity updated in cart successfully...";
            } else {
                // If the product doesn't exist, add the new cart item
                cartRepo.save(cart);
                return "Product added to cart successfully...";
            }
        } catch (Exception e) {
            return "Failed to add product to cart: " + e.getMessage();
        }
    }

    @Override
    public List<Cart> getCartByUsername(String uname) {
        return cartRepo.findByUname(uname);
    }

    @Override
    public void updateCart(Cart cart) {
        cartRepo.save(cart);
    }

    @Override
    public Cart getCartById(Long id) {
        return cartRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteCartItemById(Long id) {
        cartRepo.deleteById(id);
    }

    @Override
    public void deleteCartItemByUsernameAndProductId(String username, Long productId) {
        cartRepo.deleteByUnameAndId(username, productId);
    }
}
