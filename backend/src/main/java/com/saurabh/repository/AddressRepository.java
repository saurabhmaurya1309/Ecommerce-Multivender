package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	

}
