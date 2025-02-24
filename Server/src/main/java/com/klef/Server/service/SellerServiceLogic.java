package com.klef.Server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.Server.entity.Seller;
import com.klef.Server.repo.SellerRepo;

@Service
public class SellerServiceLogic implements SellerService {

	@Autowired
	private SellerRepo sellerrepo;

	@Override
	public String insertSeller(Seller s) {
		if(sellerrepo.existsById(s.getSname())) {
			return "Username already existing...";  
		}
		sellerrepo.save(s);  
		return "User inserted successfully...";  
	}

	@Override
	public String login(Seller s, String sname, String pwd) {
		try {
			Seller ss = sellerrepo.findById(sname).orElse(null);
			if(ss == null) {
				return "User not found. Please check the username.";
			}
			else { 
				if(ss.getPwd().equals(pwd)) 
				{
					return "Login Sucessfull...";
				}
				else {
                    return "Invalid password. Please try again.";
                }
			}
		}
		catch(Exception e ) {
			 return "Error occurred during login attempt. Please try again.";
		}
	}

	@Override
	public List<Seller> getSellers() {
		return sellerrepo.findAll();
	}

	@Override
    public String deleteSeller(String sname) {
        // Check if the seller exists
        if (sellerrepo.existsById(sname)) {
            sellerrepo.deleteById(sname);
            return "Seller deleted successfully";
        } else {
            return "Seller not found";
        }
    }
}
