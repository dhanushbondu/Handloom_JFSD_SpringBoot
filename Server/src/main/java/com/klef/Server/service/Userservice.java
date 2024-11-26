package com.klef.Server.service;

import java.util.List;

import com.klef.Server.model.User;

public interface Userservice {
	public String insertData(User user);
	public String deleteData(int id);
	public String updateById(int id,User user);
	 List<User> getAllUsers();
	 
}
