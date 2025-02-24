package com.klef.Server.payment;                                                                                             
                                                                                                                             
import com.razorpay.*;                                                                                                       
import org.json.JSONObject;                                                                                                  
import org.springframework.beans.factory.annotation.Autowired;                                                               
import org.springframework.beans.factory.annotation.Value;                                                                   
import org.springframework.stereotype.Service;                                                                               
import javax.crypto.Mac;                                                                                                     
import javax.crypto.spec.SecretKeySpec;                                                                                      
import java.util.Base64;                                                                                                     
import java.util.List;                                                                                                       
import java.util.Optional;                                                                                                   
                                                                                                                             
@Service                                                                                                                     
public class PaymentService {                                                                                                
                                                                                                                             
    @Value("${razorpay.key_id}")                                                                                             
    private String razorpayKeyId;                                                                                            
                                                                                                                             
    @Value("${razorpay.key_secret}")                                                                                         
    private String razorpayKeySecret;                                                                                        
                                                                                                                             
    @Autowired                                                                                                               
    private PaymentRepository paymentRepository;                                                                             
                                                                                                                             
    public JSONObject createOrder(OrderRequest orderRequest) throws RazorpayException {                                      
        try {                                                                                                                
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);                                  
            int amountInPaise = (int) (orderRequest.getTotalAmount() * 100);                                                 
                                                                                                                             
            JSONObject orderRequestJson = new JSONObject();                                                                  
            orderRequestJson.put("amount", amountInPaise);                                                                   
            orderRequestJson.put("currency", "INR");                                                                         
            orderRequestJson.put("receipt", "receipt_" + System.currentTimeMillis());                                        
            orderRequestJson.put("payment_capture", 1);                                                                      
                                                                                                                             
            Order order = razorpay.orders.create(orderRequestJson);                                                          
                                                                                                                             
            // Save payment details before returning                                                                         
            for (OrderItem item : orderRequest.getItems()) {                                                                 
                Payment payment = new Payment();                                                                             
                payment.setRazorpayOrderId(order.get("id").toString());                                                      
                payment.setProductId(item.getProductId());                                                                   
                payment.setProductName(item.getProductName());                                                               
                payment.setAmount(item.getPrice() * item.getQuantity());                                                     
                payment.setStatus("created");                                                                                
                payment.setUname(orderRequest.getUname()); // Ensure uname is set here                                       
                paymentRepository.save(payment); // Save the payment details in DB                                           
            }                                                                                                                
                                                                                                                             
            return order.toJson();                                                                                           
        } catch (Exception e) {                                                                                              
            throw new RazorpayException("Error creating Razorpay order: " + e.getMessage());                                 
        }                                                                                                                    
    }                                                                                                                        
                                                                                                                             
    public String verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {                
        try {                                                                                                                
            String secret = razorpayKeySecret;                                                                               
            String payload = razorpayOrderId + "|" + razorpayPaymentId;                                                      
                                                                                                                             
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");                                                                 
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");                                    
            sha256_HMAC.init(secretKey);                                                                                     
                                                                                                                             
            byte[] hash = sha256_HMAC.doFinal(payload.getBytes());                                                           
            String expectedSignature = Base64.getEncoder().encodeToString(hash);                                             
                                                                                                                             
            if (expectedSignature.equals(razorpaySignature)) {                                                               
                // Payment verified successfully, update the status in the database                                          
                Optional<Payment> paymentOptional = paymentRepository.findByRazorpayOrderId(razorpayOrderId);                
                if (paymentOptional.isPresent()) {                                                                           
                    Payment payment = paymentOptional.get();                                                                 
                    payment.setRazorpayPaymentId(razorpayPaymentId);                                                         
                    payment.setRazorpaySignature(razorpaySignature);                                                         
                    payment.setStatus("paid");                                                                               
                                                                                                                             
                    paymentRepository.save(payment); // Save the updated payment details                                     
                    return "Payment Successful";                                                                             
                } else {                                                                                                     
                    return "Order not found";                                                                                
                }                                                                                                            
            } else {                                                                                                         
                return "Invalid Signature";                                                                                  
            }                                                                                                                
        } catch (Exception e) {                                                                                              
            return "Error verifying payment: " + e.getMessage();                                                             
        }                                                                                                                    
    }                                                                                                                        
    public List<PaymentDetailsDTO> getPaymentDetailsByUsername(String uname) {                                               
        return paymentRepository.findPaymentDetailsByUname(uname);  // Fetch data using custom query                         
    }    
    
    public List<PaymentDetailsDTO> getAllPaymentDetails() {
        return paymentRepository.findAllPaymentDetails(); 
    }
    
    public List<PaymentDetailsDTO> getPaymentDetailsBySellerName(String sellerName) {
        return paymentRepository.findPaymentDetailsBySellerName(sellerName);
    }
} 