package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.OrderAddress;

public interface OrderAddressRepository extends JpaRepository<OrderAddress, Long> {
}
