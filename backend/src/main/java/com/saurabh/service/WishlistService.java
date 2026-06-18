package com.saurabh.service;
import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.model.Wishlist;

public interface WishlistService {
	Wishlist createWishlist(User user);
	Wishlist getWishlistByUserId(User user);
	Wishlist addProdutToWishlist(User user,Product product);
	
}
