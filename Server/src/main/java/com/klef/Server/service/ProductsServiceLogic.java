package com.klef.server.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.klef.server.entity.Products;
import com.klef.server.repo.ProductsRepo;

@Service
public class ProductsServiceLogic implements ProductsService {

	@Autowired
	private ProductsRepo productsrepo;

	@Override
	public String addProducts(MultipartFile file, String name, String discreption, double price, char gender)
			throws IOException {
		try {
		Products p = new Products();
		p.setName(name);
		p.setDiscription(discreption);
		p.setPrice(price);
		p.setGender(gender);
		p.setImg(file.getBytes());
		productsrepo.save(p);
		return "product added Sucessfull...";
		}catch (Exception e) {
			return "product added failed...";

		}
	}
	

	

}
