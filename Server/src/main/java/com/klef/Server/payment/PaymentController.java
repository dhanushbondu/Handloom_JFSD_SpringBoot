
package com.klef.Server.payment;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            JSONObject order = paymentService.createOrder(orderRequest);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating order: " + e.getMessage());
        }
    }

    // Verify payment after success
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> paymentData) {
        String razorpayOrderId = paymentData.get("razorpayOrderId");
        String razorpayPaymentId = paymentData.get("razorpayPaymentId");
        String razorpaySignature = paymentData.get("razorpaySignature");

        System.out.println("Received Payment Details: ");
        System.out.println("Order ID: " + razorpayOrderId);
        System.out.println("Payment ID: " + razorpayPaymentId);
        System.out.println("Signature: " + razorpaySignature);

        if (razorpayOrderId == null || razorpayPaymentId == null || razorpaySignature == null) {
            return ResponseEntity.status(400).body("Missing payment details from Razorpay.");
        }

        String response = paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
        return response.equals("Payment Successful") ? ResponseEntity.ok(response) : ResponseEntity.status(400).body(response);
    }
    
    @GetMapping("/get-payment-details/{uname}")
    public ResponseEntity<List<PaymentDetailsDTO>> getPaymentDetailsByUsername(@PathVariable String uname) {
        try {
            List<PaymentDetailsDTO> paymentDetails = paymentService.getPaymentDetailsByUsername(uname);
            if (paymentDetails.isEmpty()) {
                return ResponseEntity.status(404).body(null);  // No records found
            }
            return ResponseEntity.ok(paymentDetails);  // Return the list of payment details
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // Error while fetching data
        }
    }
    
    @GetMapping("/get-all-payments")
    public ResponseEntity<List<PaymentDetailsDTO>> getAllPaymentDetails() {
        try {
            // Fetch all payment details
            List<PaymentDetailsDTO> paymentDetails = paymentService.getAllPaymentDetails();
            if (paymentDetails.isEmpty()) {
                return ResponseEntity.status(404).body(null);  // No records found
            }
            return ResponseEntity.ok(paymentDetails);  // Return the list of payment details
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // Error while fetching data
        }
    }
    @GetMapping("/get-payments-by-seller/{sellerName}")
    public ResponseEntity<List<PaymentDetailsDTO>> getPaymentsBySeller(@PathVariable String sellerName) {
        try {
            List<PaymentDetailsDTO> paymentDetails = paymentService.getPaymentDetailsBySellerName(sellerName);
            if (paymentDetails.isEmpty()) {
                return ResponseEntity.status(404).body(null);  // No records found
            }
            return ResponseEntity.ok(paymentDetails);  // Return the list of payment details
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // Error while fetching data
        }
    }
}