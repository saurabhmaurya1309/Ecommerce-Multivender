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
	public CartItem addCartItem(User user, Product product, String size, int quantity) {
		Cart cart=finduserCart(user);
		CartItem isPresent=cartItemRepository.findByCartAndProductAndSize(cart, product, size);
		if(isPresent==null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setQuantity(quantity);
			cartItem.setUserId(user.getId());
			cartItem.setSize(size);
			int totalPrice=quantity*product.getSellingPrice();
			cartItem.setSellingPrice(totalPrice);
			cart.getCartItems().add(cartItem);
			cartItem.setCart(cart);
			
			return cartItemRepository.save(cartItem);
		}
		return isPresent;
	}

	@Override
	public Cart finduserCart(User user) {
		Cart cart =cartRepository.findByUserId(user.getId());
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
		
		for (CartItem cartItem : cart.getCartItems()) {

	        Integer mrp = cartItem.getMrpPrice();
	        Integer selling = cartItem.getSellingPrice();
	        Integer qty = cartItem.getQuantity();

	        if (mrp != null) {
	            totalPrice += mrp * (qty != null ? qty : 1);
	        }

	        if (selling != null) {
	            totalDiscountedPrice += selling * (qty != null ? qty : 1);
	        }

	        if (qty != null) {
	            totalItem += qty;
	        }
	    }
		cart.setTotalMrpPrice(totalPrice);
		cart.setToatalItem(totalItem);
		cart.setTotalSellingPrice(totalDiscountedPrice);
		cart.setDiscount(calculateDiscountPercentage(totalPrice,totalDiscountedPrice));
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
