package com.klef.Server.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.List;

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

    @Override
    public Payment createOrder(double price, String uname) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", price * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        // Create the order using Razorpay API
        Order order = razorpayClient.orders.create(orderRequest);

        // Save payment with order details
        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(price);
        payment.setStatus("CREATED");
        payment.setUname(uname);

        return paymentRepository.save(payment);
    }

    @Override
    public boolean verifySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws Exception {
        String data = razorpayOrderId + "|" + razorpayPaymentId;
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(razorpaySecret.getBytes(), "HmacSHA256");
        mac.init(secretKey);
        String generatedSignature = Base64.getEncoder().encodeToString(mac.doFinal(data.getBytes()));

        return generatedSignature.equals(razorpaySignature);
    }

    @Override
    public List<Payment> getPaymentsByUsername(String username) throws Exception {
        // Query the PaymentRepository to retrieve payments by username
        return paymentRepository.findByUname(username);
    }
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
