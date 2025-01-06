package com.klef.Server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.entity.Users;

@Repository
public interface Userrepo extends JpaRepository<Users, String>{
	long countByGender(String gender);
}
