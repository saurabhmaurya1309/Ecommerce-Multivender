package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

	Coupon findByCode(String code);

}
