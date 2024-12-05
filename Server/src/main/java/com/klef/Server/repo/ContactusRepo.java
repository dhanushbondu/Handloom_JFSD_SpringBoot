package com.klef.server.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.server.entity.Contactus;

public interface ContactusRepo extends JpaRepository<Contactus, Long> {

}
