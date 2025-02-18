package com.klef.Server.service;

import com.klef.Server.entity.Seller;

public interface SellerService {
		
	public String insertSeller(Seller s);
	
	public String login(Seller s,String sname,String pwd);
	
		
}
