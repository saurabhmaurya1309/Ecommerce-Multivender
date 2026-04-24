package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.model.Wishlist;
import com.saurabh.repository.WishlistRepository;
import com.saurabh.service.WishlistService;

@Service
public class WishlistServiceImpl implements WishlistService{
	private final WishlistRepository wishlistRepository;

	public WishlistServiceImpl(WishlistRepository wishlistRepository) {
		super();
		this.wishlistRepository = wishlistRepository;
	}

	@Override
	public Wishlist createWishlist(User user) {
		Wishlist wishlist = new Wishlist();
		wishlist.setUser(user);
		return wishlistRepository.save(wishlist);
	}

	@Override
	public Wishlist getWishlistByUserId(User user) {
		Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
		if(wishlist==null) {
			wishlist=createWishlist(user);
		}
		return wishlist;
	}

	@Override
	public Wishlist addProdutToWishlist(User user, Product product) {
		Wishlist wishlist =getWishlistByUserId(user);
		if(wishlist.getProducts().contains(product)) {
			wishlist.getProducts().remove(product);
		}
		else {
			wishlist.getProducts().add(product);
		}
		return wishlistRepository.save(wishlist);
	}

}
