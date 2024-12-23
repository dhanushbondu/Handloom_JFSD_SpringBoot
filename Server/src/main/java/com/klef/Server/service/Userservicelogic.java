package com.klef.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.server.entity.Users;
import com.klef.server.repo.UserRepo;

@Service
public class UserServiceLogic implements UserService {

    @Autowired
    private UserRepo userrepo;


    @Override
    public String insertUser(Users user) {
        try {
            // Check if user already exists
            if (userrepo.existsById(user.getUname())) {
                return "Username already exists. Please choose a different one.";
            }
            userrepo.save(user);
            return "User inserted successfully...";
        } catch (Exception e) {
            return "User insertion failed. Error: " + e.getMessage();
        }
    }

    @Override
    public String checkUser(Users user, String uname, String pwd) {
        try {
            Users u = userrepo.findById(uname).orElse(null);
            if (u == null) {
                return "User not found. Please check the username.";
            } else {
                if (u.getPwd().equals(pwd)) {  
                    return "Login successful...";
                } else {
                    return "Invalid password. Please try again.";
                }
            }
        } catch (Exception e) {
            return "Error occurred during login attempt. Please try again.";
        }
    }

    @Override
    public long getUserCount() {
        return userrepo.count(); // Fetch the total count of users from the database
    }

    @Override
    public List<Users> getAllUsers() {
        return userrepo.findAll();  // Ensure this method returns all users from the database
    }

    @Override
    public void deleteUser(String uname) { // Change to delete by uname
        try {
            if (userrepo.existsById(uname)) {
                userrepo.deleteById(uname); // Use uname as the identifier
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete user with uname: " + uname);
        }
    }

    @Override
    public Users updateUser(Long id, Users user) {
        
        return null;
    }
    
    public Long getUserCountByGender(String gender) {
        return userrepo.countByGender(gender); // Assuming you have a gender field in your Users entity
    }


}
