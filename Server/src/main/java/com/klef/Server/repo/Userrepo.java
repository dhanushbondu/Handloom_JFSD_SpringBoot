package com.klef.Server.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.Server.model.User;

@Repository
public interface Userrepo extends JpaRepository<User, Integer>{

}
