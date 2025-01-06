package com.klef.Server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String>{

}
