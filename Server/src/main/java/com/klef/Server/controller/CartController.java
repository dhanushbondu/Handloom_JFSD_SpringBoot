package com.klef.Server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.Server.dto.DeleteCartItemRequest;
import com.klef.Server.entity.Cart;
import com.klef.Server.entity.Products;
import com.klef.Server.repo.ProductsRepo;
import com.klef.Server.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductsRepo productsRepo;

    // Add product to cart
    @PostMapping("/add")
    public ResponseEntity<String> addProductToCart(@RequestParam String uname, @RequestParam Long productId, @RequestParam(defaultValue = "1") int quantity) {
        try {
            Products product = productsRepo.findById(productId).orElseThrow(() -> 
                new RuntimeException("Product not found with ID: " + productId)
            );

            Cart cart = new Cart();
            cart.setUname(uname);
            cart.setId(product.getId());
            cart.setQuantity(quantity);
            cart.setName(product.getName());
            cart.setPrice(product.getPrice());
            cart.setImg(product.getImg());

            String response = cartService.addProductCart(cart);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Get all cart items for a user
    @GetMapping("/items")
    public ResponseEntity<List<Cart>> getCartItems(@RequestParam String username) {
        try {
            List<Cart> cartItems = cartService.getCartByUsername(username);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Update cart item
    @PutMapping("/update")
    public ResponseEntity<String> updateCartItem(@RequestBody Cart updatedCart) {
        try {
            Cart existingCartItem = cartService.getCartById(updatedCart.getId());
            if (existingCartItem == null) {
                return ResponseEntity.status(404).body("Cart item not found");
            }

            existingCartItem.setQuantity(updatedCart.getQuantity());
            cartService.updateCart(existingCartItem);

            return ResponseEntity.ok("Cart item updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating cart item: " + e.getMessage());
        }
    }

    // Increment quantity
    @PutMapping("/increment")
    public ResponseEntity<String> incrementQuantity(@RequestBody DeleteCartItemRequest request) {
        try {
            System.out.println("Increment request: " + request.getUsername() + " Product ID: " + request.getId());
            
            Cart cartItem = cartService.getCartByUnameAndId(request.getUsername(), request.getId());
            if (cartItem == null) {
                return ResponseEntity.status(404).body("Cart item not found.");
            }

            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartService.updateCart(cartItem);

            return ResponseEntity.ok("Quantity incremented successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error incrementing quantity: " + e.getMessage());
        }
    }

    // Decrement quantity
    @PutMapping("/decrement")
    public ResponseEntity<String> decrementQuantity(@RequestBody DeleteCartItemRequest request) {
        try {
            Cart cartItem = cartService.getCartByUnameAndId(request.getUsername(), request.getId());
            if (cartItem == null) {
                return ResponseEntity.status(404).body("Cart item not found.");
            }

            if (cartItem.getQuantity() > 1) {
                cartItem.setQuantity(cartItem.getQuantity() - 1);
                cartService.updateCart(cartItem);
                return ResponseEntity.ok("Quantity decremented successfully.");
            }
            return ResponseEntity.status(400).body("Quantity cannot be less than 1.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error decrementing quantity: " + e.getMessage());
        }
    }

    // Delete cart item
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCartItem(@RequestParam String uname, @RequestParam Long productId) {
        try {
            // Check if productId is 0, delete all items for the user
            if (productId == 0) {
                cartService.deleteAllCartItems(uname);
            } else {
                cartService.deleteCartItem(uname, productId);
            }
            return ResponseEntity.ok("Cart item(s) deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting cart item: " + e.getMessage());
        }
    }
}
