package com.klef.Server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.Server.model.User;
import com.klef.Server.service.Userservice;

@RestController
@RequestMapping("users") 
public class UserController {
    
    @Autowired
    private Userservice userservice;
    
    @PostMapping("/insert-data")
    public ResponseEntity<String> insertData(@RequestBody User user) {
        System.out.println("Received User: " + user.getName()); 
        String result = userservice.insertData(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    
    @DeleteMapping("/delete/{id}") // Path variable to specify user ID
    public ResponseEntity<String> deleteData(@PathVariable("id") int id) {
        String result = userservice.deleteData(id);
        if (result.equals("user delection sucessful!!")) {
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userservice.getAllUsers();
        if (users != null && !users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateData(@PathVariable("id") int id, @RequestBody User updatedUser) {
        String result = userservice.updateById(id, updatedUser);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    @GetMapping("testing")
    public String test() {
        return "Hello, Spring Boot1!";
    }
}
