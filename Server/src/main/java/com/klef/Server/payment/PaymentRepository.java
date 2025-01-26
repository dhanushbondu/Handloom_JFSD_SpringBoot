package com.klef.Server.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Custom query method to find payments by username
    List<Payment> findByUname(String uname);
    List<Payment> findAll();  // To fetch payments of all users

}
