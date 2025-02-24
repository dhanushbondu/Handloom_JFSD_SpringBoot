package com.klef.Server.service;

import java.util.List;

import com.klef.Server.entity.Seller;

public interface SellerService {
		
	public String insertSeller(Seller s);
	
	public String login(Seller s,String sname,String pwd);
	
	public 	List<Seller> getSellers();

    public String deleteSeller(String sname);

}
