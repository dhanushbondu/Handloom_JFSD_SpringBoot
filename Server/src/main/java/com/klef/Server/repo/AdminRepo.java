package com.klef.server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.server.entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String>{

}
