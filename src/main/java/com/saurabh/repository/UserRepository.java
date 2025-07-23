package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
	

}
