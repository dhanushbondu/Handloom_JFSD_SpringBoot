package com.klef.Server.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;
   

    private final PaymentRepository paymentRepository;

    // Constructor-based dependency injection for PaymentRepository
    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // Create an order with Razorpay and store username along with price
    @Override
    public Payment createOrder(double price, String uname) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", price * 100); // Amount in paise (100 paise = 1 INR)
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        // Create the order using Razorpay API
        Order order = razorpayClient.orders.create(orderRequest);

        // Create a new Payment record with the username and price
        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(price);
        payment.setStatus("CREATED");
        payment.setUname(uname);  // Store the username

        // Save payment to the repository
        return paymentRepository.save(payment);
    }

    // Verify the payment signature
    @Override
    public boolean verifySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws Exception {
        String data = razorpayOrderId + "|" + razorpayPaymentId;
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(razorpaySecret.getBytes(), "HmacSHA256");
        mac.init(secretKey);
        String generatedSignature = Base64.getEncoder().encodeToString(mac.doFinal(data.getBytes()));

        return generatedSignature.equals(razorpaySignature);
    }
}
