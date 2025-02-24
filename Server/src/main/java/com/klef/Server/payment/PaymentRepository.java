package com.klef.Server.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByRazorpayOrderId(String orderId);
    @Query("SELECT new com.klef.Server.payment.PaymentDetailsDTO(p.productId, p.productName, p.amount, p.razorpayOrderId) " +
            "FROM Payment p WHERE p.uname = :uname")
     List<PaymentDetailsDTO> findPaymentDetailsByUname(String uname);
    @Query("SELECT new com.klef.Server.payment.PaymentDetailsDTO(p.productId, p.productName, p.amount, p.razorpayOrderId, p.uname) " +
            "FROM Payment p")
    List<PaymentDetailsDTO> findAllPaymentDetails();
    
    @Query("SELECT new com.klef.Server.payment.PaymentDetailsDTO(p.productId, p.productName, p.amount, p.razorpayOrderId, p.sellerName) " +
            "FROM Payment p JOIN Products pr ON p.productId = pr.id " +
            "WHERE pr.sellerName = :sellerName")
     List<PaymentDetailsDTO> findPaymentDetailsBySellerName(String sellerName);
}