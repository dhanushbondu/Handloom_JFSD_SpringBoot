package com.klef.server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.server.entity.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, String>{

}
