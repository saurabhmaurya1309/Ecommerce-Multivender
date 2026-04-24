package com.saurabh.service;

import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.Product;
import com.saurabh.model.User;

public interface CartService {
	
	public CartItem addCartItem(
			User user,
			Product product,
			String size,
			int quantity
			);
	
	public Cart finduserCart(User user);
	

}
