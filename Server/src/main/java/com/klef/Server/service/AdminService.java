package com.klef.server.service;

import com.klef.server.entity.Admin;

public interface AdminService {
	public String addAdmin(Admin admin);
	public String adminLogin(String uname, String pwd);
}