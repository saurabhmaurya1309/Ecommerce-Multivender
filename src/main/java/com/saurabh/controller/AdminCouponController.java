package com.saurabh.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Cart;
import com.saurabh.model.Coupon;
import com.saurabh.model.User;
import com.saurabh.service.CartService;
import com.saurabh.service.CouponService;
import com.saurabh.service.UserService;

@RestController
@RequestMapping("/api")
public class AdminCouponController {
	private final CouponService couponService;
	private final UserService userService;
	private final CartService cartService;

	public AdminCouponController(CouponService couponService, UserService userService, CartService cartService) {
		super();
		this.couponService = couponService;
		this.userService = userService;
		this.cartService = cartService;
	}

	@PostMapping("/apply")
	public ResponseEntity<Cart> applyCoupon(@RequestParam String apply, @RequestParam String code,
			@RequestParam double orderValue, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Cart cart;
		if(apply.equals("true")) {
			cart= couponService.applyCoupon(code, orderValue, user);
		}
		else {
			cart= couponService.removeCoupon(code, user);
		}

		return ResponseEntity.ok(cart);
	}
	
	@PostMapping("/admin/create")
	public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) throws Exception {
		Coupon createCoupon = couponService.createCoupon(coupon);

		return ResponseEntity.ok(createCoupon);
	}
	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
		couponService.deleteCoupon(id);

		return ResponseEntity.ok("Coupon deleted sucessfully");
	}
	
	@GetMapping("/admin/all")
	public ResponseEntity<List<Coupon>> getAllCoupons() {
		List<Coupon>coupons = couponService.findAllCoupon();

		return ResponseEntity.ok(coupons);
	}

}
