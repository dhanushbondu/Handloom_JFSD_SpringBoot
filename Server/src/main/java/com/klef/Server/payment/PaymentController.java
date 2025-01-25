package com.klef.Server.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Endpoint to create an order
    @PostMapping("/create-order")
    public ResponseEntity<Payment> createOrder(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Pass the price from the request to create an order
            Payment payment = paymentService.createOrder(paymentRequest.getPrice(), paymentRequest.getUname());
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint to verify payment signature
    @PostMapping("/verify-signature")
    public ResponseEntity<String> verifySignature(@RequestParam("razorpayOrderId") String razorpayOrderId,
                                                  @RequestParam("razorpayPaymentId") String razorpayPaymentId,
                                                  @RequestParam("razorpaySignature") String razorpaySignature) {
        try {
            boolean isSignatureValid = paymentService.verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
            if (isSignatureValid) {
                return ResponseEntity.ok("Payment Verified");
            } else {
                return ResponseEntity.status(400).body("Invalid Signature");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying payment");
        }
    }
}
