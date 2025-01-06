package com.klef.Server.service;

import com.klef.Server.entity.Admin;

public interface AdminService {
	public String addAdmin(Admin admin);
	public String adminLogin(String uname, String pwd);
}
