package com.klef.Server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.Server.model.User;
import com.klef.Server.repo.Userrepo;


@Service
public class Userservicelogic implements Userservice {

	@Autowired
	private Userrepo userrepo;
	
	@Override
	public String insertData(User user) {
	    try {
	        userrepo.save(user);
	        return "user inserted successfully";
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "error occurred during insertion: " + e.getMessage();
	    }
	}

	@Override
	public String deleteData(int id) {
		try {
			userrepo.deleteById(id);
			return "user delection sucessful!!";
		}catch (Exception e) {
	        return "error occurred during delection: " + e.getMessage();
		}

	}

	@Override
	public String updateById(int id,User user) {
		try {
			User u = userrepo.findById(id).get();
			u.setName(user.getName());
			userrepo.save(u);
			 return "User updated successfully!";
		}catch (Exception e) {
			 return "Error during update: " + e.getMessage();
		}
	}

	@Override
	public List<User> getAllUsers() {
		try {
            return userrepo.findAll();
        } catch (Exception e) {
            return null;  // You can also handle the exception as needed
        }
	}


	

}
