package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.model.CartItem;
import com.saurabh.model.User;
import com.saurabh.repository.CartItemRepository;
import com.saurabh.service.CartItemService;
@Service
public class CartItemServiceImpl  implements CartItemService{
	
	private final CartItemRepository cartItemRepository;

	public CartItemServiceImpl(CartItemRepository cartItemRepository) {
		super();
		this.cartItemRepository = cartItemRepository;
	}
	
	@Override
	public CartItem updateCartItem(
	        Long userId,
	        Long id,
	        CartItem cartItem) throws Exception {

	    CartItem item = findCartItemById(id);

	    User cartItemUser = item.getCart().getUser();

	    if (cartItemUser.getId().equals(userId)) {

	        item.setQuantity(cartItem.getQuantity());

	        // Prices are PER UNIT
	        item.setMrpPrice(
	                item.getProduct().getMrpPrice()
	        );

	        item.setSellingPrice(
	                item.getProduct().getSellingPrice()
	        );

	        return cartItemRepository.save(item);
	    }

	    throw new Exception("You can not update this cart item");
	}
	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws Exception {
		CartItem item=findCartItemById(cartItemId);
		User cartItemUser=item.getCart().getUser();
		if(cartItemUser.getId().equals(userId)) {
			cartItemRepository.delete(item);
		}
		else throw new Exception("you can not delete this item");
		
	}

	@Override
	public CartItem findCartItemById(Long id) throws Exception {
		
		return cartItemRepository.findById(id).orElseThrow(()->
					new Exception("cart item not found with id "+id));
	}

}
