package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
