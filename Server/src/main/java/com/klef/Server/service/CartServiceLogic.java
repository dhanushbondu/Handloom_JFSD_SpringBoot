package com.klef.Server.service;

import com.klef.Server.entity.Cart;
import com.klef.Server.repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    @Transactional
    public void deleteCartItem(String uname, Long id) {
        try {
            // Retrieve the cart item
            Cart existingCartItem = cartRepo.findByUnameAndId(uname, id);
            
            if (existingCartItem != null) {
                System.out.println("Deleting Cart Item: " + existingCartItem);
                cartRepo.deleteByUnameAndId(uname, id);
            } else {
                System.out.println("Cart item not found for username: " + uname + " and product ID: " + id);
                throw new RuntimeException("Cart item not found for username: " + uname + " and product ID: " + id);
            }
        } catch (Exception e) {
            System.out.println("Error while deleting cart item: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public Cart getCartByUnameAndId(String uname, Long id) {
        return cartRepo.findByUnameAndId(uname, id);
    }

    public void updateOrderStatus(String uname, Long orderId) {
        Cart cart = cartRepo.findByUnameAndId(uname, orderId);
        if (cart != null) {
            cartRepo.save(cart);
        }
    }
    
    @Override
    @Transactional
    public void deleteAllCartItems(String uname) {
        try {
            // Delete all cart items for the user
            List<Cart> cartItems = cartRepo.findByUname(uname);
            if (cartItems != null && !cartItems.isEmpty()) {
                cartRepo.deleteAll(cartItems); 
                System.out.println("All cart items for user " + uname + " have been deleted.");
            } else {
                System.out.println("No cart items found for user " + uname);
            }
        } catch (Exception e) {
            System.out.println("Error while deleting all cart items: " + e.getMessage());
            throw e;
        }
    }

	@Override
	public List<Cart> getCartByUsername1(String uname) {
		 return cartRepo.findByUname(uname);
	}
    
    
}
