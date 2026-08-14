package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.repository.CartItemRepository;
import com.saurabh.repository.CartRepository;
import com.saurabh.service.CartService;

@Service
public class CartServiceImpl implements CartService {
	
	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;

	public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository) {
		super();
		this.cartRepository = cartRepository;
		this.cartItemRepository = cartItemRepository;
	}

	@Override
	public CartItem addCartItem(User user,Product product, String size, int quantity) {
	    Cart cart = finduserCart(user);
	    CartItem existingItem = cartItemRepository.findByCartAndProductAndSize(cart, product,size );
	    if (existingItem != null) {

	        // Same product + same size already exists
	    	System.out.println("saurabh");
	        existingItem.setQuantity(
	                existingItem.getQuantity() + quantity
	        );

	        return cartItemRepository.save(existingItem);
	    }

	    // Create new cart item
	    CartItem cartItem = new CartItem();

	    cartItem.setCart(cart);
	    cartItem.setProduct(product);
	    cartItem.setSize(size);
	    cartItem.setQuantity(quantity);
	    cartItem.setUserId(user.getId());

	    // Store price PER UNIT
	    cartItem.setMrpPrice(product.getMrpPrice());
	    cartItem.setSellingPrice(product.getSellingPrice());

	    cart.getCartItems().add(cartItem);

	    return cartItemRepository.save(cartItem);
	}

	@Override
	public Cart finduserCart(User user) {

	    Cart cart = cartRepository.findByUserId(user.getId());

	    int totalMrpPrice = 0;
	    int totalSellingPrice = 0;
	    int totalItem = 0;

	    for (CartItem cartItem : cart.getCartItems()) {

	        int quantity = cartItem.getQuantity();

	        int mrpPrice = cartItem.getMrpPrice() != null
	                ? cartItem.getMrpPrice()
	                : 0;

	        int sellingPrice = cartItem.getSellingPrice() != null
	                ? cartItem.getSellingPrice()
	                : 0;

	        totalMrpPrice += mrpPrice * quantity;

	        totalSellingPrice += sellingPrice * quantity;

	        totalItem += quantity;
	    }

	    cart.setTotalMrpPrice(totalMrpPrice);
	    cart.setToatalItem(totalItem);
	    cart.setTotalSellingPrice(totalSellingPrice);

	    cart.setDiscount(
	            calculateDiscountPercentage(
	                    totalMrpPrice,
	                    totalSellingPrice
	            )
	    );

	    return cart;
	}

	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
		if (mrpPrice <= 0) {
	        return 0; // no discount possible when nothing in cart
	    }
		int discount=mrpPrice-sellingPrice;
		int ans=discount*100/mrpPrice;
		return ans;
	}

}
