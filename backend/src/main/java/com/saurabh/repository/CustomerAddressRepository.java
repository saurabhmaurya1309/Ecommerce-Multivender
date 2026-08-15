package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.CustomerAddress;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress,Long> {

}
