package com.klef.server.service;

import com.klef.server.entity.Users;
import java.util.List;

public interface UserService {
    public String insertUser(Users user);  // Insert a new user
    public String checkUser(Users user, String uname, String pwd);  // Check login credentials
    public long getUserCount();  // Get total user count
    public List<Users> getAllUsers();  // Get a list of all users
    public void deleteUser(String uname);  // Delete a user by ID
    public Users updateUser(Long id, Users user);  // Update user details by ID
    public Long getUserCountByGender(String gender);
}
