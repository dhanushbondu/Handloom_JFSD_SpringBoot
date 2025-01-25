package com.klef.Server.payment;

public interface PaymentService {
    Payment createOrder(double price, String uname) throws Exception;
    boolean verifySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws Exception;
}
