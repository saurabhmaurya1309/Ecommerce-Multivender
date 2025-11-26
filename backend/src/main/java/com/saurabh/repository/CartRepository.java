package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.saurabh.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	
	

}
