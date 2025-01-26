package com.klef.Server.payment;

import java.util.List;

public interface PaymentService {
    Payment createOrder(double price, String uname) throws Exception;
    boolean verifySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws Exception;
    List<Payment> getPaymentsByUsername(String username) throws Exception;  // New method
    public List<Payment> getAllPayments();
}
