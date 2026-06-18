package com.saurabh.service;
import java.util.List;

import com.saurabh.model.Cart;
import com.saurabh.model.User;
import com.saurabh.model.Coupon;

public interface CouponService {
	Cart applyCoupon(String code,double orderValue,User user) throws Exception;
	Cart removeCoupon(String code,User user) throws Exception;
	Coupon findCouponById(Long id) throws Exception;
	List<Coupon>findAllCoupon();
	void deleteCoupon(Long id) throws Exception;
	Coupon createCoupon(Coupon coupon);

}
