package com.klef.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.server.entity.Admin;
import com.klef.server.repo.AdminRepo;

@Service
public class AdminServiceLogic implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public String addAdmin(Admin admin) {
        try {
            Admin savedAdmin = adminRepo.save(admin);
            return savedAdmin != null ? "Admin registration successful!" : "Admin registration failed.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred during admin registration.";
        }
    }

    @Override
    public String adminLogin(String uname, String pwd) {
        try {
            Admin admin = adminRepo.findById(uname).orElse(null);
            if (admin != null && admin.getPwd().equals(pwd)) {
                return "Login successful...";
            }
            return admin == null ? "Admin not found." : "Invalid password.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred during login.";
        }
    }


}
