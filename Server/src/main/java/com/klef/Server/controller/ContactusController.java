package com.klef.Server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.Server.entity.Contactus;
import com.klef.Server.service.ContactusService;

@RestController
@RequestMapping("users")
public class ContactusController {
	
	@Autowired
	private ContactusService contactservice;
	
	@PostMapping("/contactus")
	public ResponseEntity<String> insertContactusData(@RequestBody Contactus contactus){
		try {
			String c = contactservice.insertContactData(contactus);
			if(c!=null) {
				return new ResponseEntity<>(c,HttpStatus.OK);
			}
		}catch (Exception e) {
			// TODO: handle exception
		}
        return new ResponseEntity<>("Error submitting your message. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR); // Failure response
	}
	
}
