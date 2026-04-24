package com.saurabh.controller;

import java.awt.desktop.UserSessionEvent;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Product;
import com.saurabh.model.User;
import com.saurabh.model.Wishlist;
import com.saurabh.service.ProductService;
import com.saurabh.service.UserService;
import com.saurabh.service.WishlistService;
import com.stripe.param.ProductSearchParams;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
	private final WishlistService wishlistService;
	private final UserService userService;
	private final ProductService productService;

	public WishlistController(WishlistService wishlistService, UserService userService, ProductService productService) {
		super();
		this.wishlistService = wishlistService;
		this.userService = userService;
		this.productService = productService;
	}
	
	@GetMapping()
	public ResponseEntity<Wishlist>getWishlistByUserId(@RequestHeader("Authorization") String jwt) throws Exception{
		User user =userService.findUserByJwtToken(jwt);
		Wishlist wishlist=wishlistService.getWishlistByUserId(user);
		return ResponseEntity.ok(wishlist);
		
	}
	
	@PostMapping("/add-product/{productId}")
	public ResponseEntity<Wishlist>addProductToWishlist(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		Product product = productService.findProductById(productId);
		User user =userService.findUserByJwtToken(jwt);
		Wishlist updatedWishlist=wishlistService.addProdutToWishlist(user, product);
		return ResponseEntity.ok(updatedWishlist);
		
		
	}
	

}
