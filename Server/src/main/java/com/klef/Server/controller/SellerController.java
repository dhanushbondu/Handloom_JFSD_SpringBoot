package com.klef.Server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klef.Server.entity.Seller;
import com.klef.Server.service.SellerService;

@Controller
@RequestMapping("/seller")
public class SellerController {

    @Autowired
    private SellerService sellerservice;

    @PostMapping("/insert")
    public ResponseEntity<String> insertSeller(@RequestBody Seller s) {
        String res = sellerservice.insertSeller(s);
        if (res.contains("Username already existing...")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> loginSeller(@RequestBody Seller s){
    	{
    		String ss = sellerservice.login(s, s.getSname(), s.getPwd()); 
    		if(ss.equals("Login Sucessfull...")) {
    			return ResponseEntity.ok(s.getSname());
    		}
    		else {
    			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ss);
    		}
    	}
    }
    
    @GetMapping("/getAllSellers")
    public ResponseEntity<List<Seller>> getAllSellers(){
        List<Seller> sellers = sellerservice.getSellers();
        if (sellers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(sellers);
    }
    
    @DeleteMapping("/deleteSeller/{sname}")
    public ResponseEntity<String> deleteSeller(@PathVariable String sname) {
        String result = sellerservice.deleteSeller(sname);
        if (result.equals("Seller deleted successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
    
    
}

