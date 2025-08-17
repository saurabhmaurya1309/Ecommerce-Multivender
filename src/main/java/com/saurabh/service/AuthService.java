package com.saurabh.service;

import org.springframework.stereotype.Service;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.request.LoginRequest;
import com.saurabh.response.AuthResponse;
import com.saurabh.response.SignupRequest;

@Service
public interface AuthService {
	
	void sendLoginOtp(String email,USER_ROLE role) throws Exception;
	String createUser(SignupRequest req) throws Exception;
	
	AuthResponse siging(LoginRequest req);
	
	
	
	

}
