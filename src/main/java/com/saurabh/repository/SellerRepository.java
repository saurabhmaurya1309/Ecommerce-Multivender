package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long>{
	
	Seller findByEmail(String email);

}
