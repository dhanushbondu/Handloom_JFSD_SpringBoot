package com.klef.Server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    
    
}

