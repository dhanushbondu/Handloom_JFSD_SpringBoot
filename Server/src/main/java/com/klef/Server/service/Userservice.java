package com.klef.Server.service;

import java.util.List;

import com.klef.Server.entity.Users;

public interface Userservice {
    public String insertUser(Users user);  // Insert a new user
    public String checkUser(Users user, String uname, String pwd);  // Check login credentials
    public long getUserCount();  // Get total user count
    public List<Users> getAllUsers();  // Get a list of all users
    public void deleteUser(String uname);  // Delete a user by ID
    public Users updateUser(Long id, Users user);  // Update user details by ID
    public Long getUserCountByGender(String gender);
}
