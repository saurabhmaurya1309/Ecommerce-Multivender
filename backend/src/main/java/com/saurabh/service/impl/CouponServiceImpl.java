package com.saurabh.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.saurabh.model.Cart;
import com.saurabh.model.Coupon;
import com.saurabh.model.User;
import com.saurabh.repository.CartRepository;
import com.saurabh.repository.CouponRepository;
import com.saurabh.repository.UserRepository;
import com.saurabh.service.CouponService;

@Service
public class CouponServiceImpl implements CouponService {
	private final CouponRepository couponRepository;
	private final CartRepository cartRepository;
	private final UserRepository userRepository;

	public CouponServiceImpl(CouponRepository couponRepository, CartRepository cartRepository, UserRepository userRepository) {
		super();
		this.couponRepository = couponRepository;
		this.cartRepository = cartRepository;
		this.userRepository = userRepository;
	}

	@Override
	public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
		Coupon coupon = couponRepository.findByCode(code);
		Cart cart = cartRepository.findByUserId(user.getId());
		if(coupon==null) {
			throw new Exception("Coupon is not valid");
		}
		if(user.getUsedCoupons().contains(coupon)) {
			throw new Exception("Coupon already used");
			
		}
		if(orderValue<coupon.getMinimumOrderValue()) {
			throw new Exception("order is less than minimum order value"+coupon.getMinimumOrderValue());
			
		}
		if(coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate()) 
				&& LocalDate.now().isBefore(coupon.getValidityEndDate())) {
			user.getUsedCoupons().add(coupon);
			userRepository.save(user);
			double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
			cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
			cart.setCouponCode(code);
			cartRepository.save(cart);
			return cart;
		}
		
		throw new Exception("Coupon is not valid"); 
	}

	@Override
	public Cart removeCoupon(String code, User user) throws Exception {
		Coupon coupon = couponRepository.findByCode(code);
		if(coupon==null) {
			throw new Exception("Coupon is not found");
		}
		Cart cart = cartRepository.findByUserId(user.getId());
		
		double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
		cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);
		cart.setCouponCode(null);
		cartRepository.save(cart);
		return cart;
		
	}

	@Override
	public Coupon findCouponById(Long id) throws Exception {
		return couponRepository.findById(id).orElseThrow(()->  new Exception("Coupon not found"));
	}

	@Override
	public List<Coupon> findAllCoupon() {
		return couponRepository.findAll();
	}

	@Override
	@PreAuthorize("hasRole ('ADMIN')")
	public void deleteCoupon(Long id)  throws Exception{
		findCouponById(id); 
		couponRepository.deleteById(id);
		
	}

	@Override
	@PreAuthorize("hasRole ('ADMIN')")
	public Coupon createCoupon(Coupon coupon) {
		
		return couponRepository.save(coupon);
	}

}
