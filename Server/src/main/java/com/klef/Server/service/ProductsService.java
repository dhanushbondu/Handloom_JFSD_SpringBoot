package com.klef.server.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ProductsService {
	public String addProducts(MultipartFile file,String name,String discreption,double price,char gender)throws IOException;
}
