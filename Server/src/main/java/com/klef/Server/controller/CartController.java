package com.klef.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klef.server.dto.DeleteCartItemRequest;
import com.klef.server.entity.Cart;
import com.klef.server.entity.Products;
import com.klef.server.repo.ProductsRepo;
import com.klef.server.service.CartService;

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

    // Delete cart item
    @PostMapping("/delete")
    public ResponseEntity<String> deleteCartItem(@RequestBody DeleteCartItemRequest request) {
        try {
            cartService.deleteCartItemByUsernameAndProductId(request.getUsername(), request.getId());
            return ResponseEntity.ok("Item deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
