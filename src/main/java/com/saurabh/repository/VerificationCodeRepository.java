package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.VerificationCode;

public interface VerificationCodeRepository  extends JpaRepository<VerificationCode, Long>{
	
	VerificationCode  findByEmail(String email);

	VerificationCode findByOtp(String otp);
}
