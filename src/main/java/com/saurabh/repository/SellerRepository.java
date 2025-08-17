package com.saurabh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Seller;
import com.saurabh.domain.AccountStatus;


public interface SellerRepository extends JpaRepository<Seller, Long>{
	
	Seller findByEmail(String email);
	List<Seller> findByAccountStatus(AccountStatus accountStatus);

}
