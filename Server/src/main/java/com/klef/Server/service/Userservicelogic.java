package com.klef.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.server.entity.Users;
import com.klef.server.repo.UserRepo;

@Service
public class UserServiceLogic implements UserService{

	
	@Autowired
	private UserRepo userrepo;
	
	@Override
	public String insertUser(Users user) {
		try {
			userrepo.save(user);
			return "User inserted sucessfull...";
		}catch (Exception e) {
			return "User inserction failed...";
		}
	}

	@Override
    public String checkUser(Users user, String uname, String pwd) {
        try {
            // Try to find the user by username (primary key)
            Users u = userrepo.findById(uname).orElse(null);
            if (u == null) {
                // If user is not found
                return "User not found. Please check the username.";
            } else {
                // Compare the entered password with the stored password
                if (u.getPwd().equals(pwd)) {  // Compare the input password with the stored password
                    return "Login successful...";
                } else {
                    return "Invalid password. Please try again.";
                }
            }
        } catch (Exception e) {
            return "Error occurred during login attempt. Please try again.";
        }
    }

}
