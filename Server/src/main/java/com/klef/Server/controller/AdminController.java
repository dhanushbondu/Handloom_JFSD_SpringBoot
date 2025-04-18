package com.klef.Server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.Server.entity.Admin;
import com.klef.Server.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/addAdmin")
    public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
        String result = adminService.addAdmin(admin);
        return ResponseEntity.status(result.contains("successful") ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST).body(result);
    }

    @PostMapping("/adminlogin")
    public ResponseEntity<String> adminLogin(@RequestBody Admin admin) {
        String result = adminService.adminLogin(admin.getUname(), admin.getPwd());
        if (result.equals("Login successful...")) {
            return ResponseEntity.ok(admin.getUname());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
        
}
