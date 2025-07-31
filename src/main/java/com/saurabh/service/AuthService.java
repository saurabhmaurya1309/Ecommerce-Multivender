package com.saurabh.service;

import org.springframework.stereotype.Service;

import com.saurabh.response.SignupRequest;

@Service
public interface AuthService {
	
	String createUser(SignupRequest req);

}
