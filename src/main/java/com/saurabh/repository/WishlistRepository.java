package com.saurabh.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Wishlist;

public interface WishlistRepository  extends JpaRepository<Wishlist, Long>{
	Wishlist findByUserId(Long userId);
  }
