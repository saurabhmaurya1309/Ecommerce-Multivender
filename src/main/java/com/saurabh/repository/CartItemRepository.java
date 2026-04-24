package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	CartItem findByCartAndProductAndSize(Cart cart,Product product,String size);

}
