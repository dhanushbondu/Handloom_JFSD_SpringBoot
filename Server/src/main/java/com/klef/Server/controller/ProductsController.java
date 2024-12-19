package com.klef.server.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klef.server.service.ProductsService;

@RestController
@RequestMapping("/products")
public class ProductsController {
	@Autowired
	private ProductsService productsservice;
	
	@PostMapping("/add-products")
	public String addProducts(@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name,
			@RequestParam("discription") String discription,
			@RequestParam("price") double price,
			@RequestParam("gender") char gender ) 
	{
		try {
			productsservice.addProducts(file, name, discription, price, gender);
			return "product added sucessfull...";
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "product added failed...";
		
	}

}
