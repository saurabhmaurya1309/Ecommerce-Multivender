package com.saurabh.service;

import org.springframework.stereotype.Service;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.domain.VerificationPurpose;
import com.saurabh.request.LoginRequest;
import com.saurabh.request.ResetPasswordRequest;
import com.saurabh.response.AuthResponse;
import com.saurabh.response.SignupRequest;

@Service
public interface AuthService {
	
	void sendOtp(String email, VerificationPurpose purpose, USER_ROLE role) throws Exception;
	void createUser(SignupRequest req) throws Exception;
	
	AuthResponse login(LoginRequest req) throws Exception;
	AuthResponse loginSeller(LoginRequest req) throws Exception;
	void resetPassword(  ResetPasswordRequest request,USER_ROLE role) throws Exception;
	
	
	
	

}
