package com.saurabh.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.model.VerificationCode;
import com.saurabh.repository.UserRepository;
import com.saurabh.request.LoginOtpRequest;
import com.saurabh.request.LoginRequest;
import com.saurabh.response.ApiResponse;
import com.saurabh.response.AuthResponse;
import com.saurabh.response.SignupRequest;

import com.saurabh.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse>createUserHandler(@RequestBody SignupRequest req) throws Exception{
		String jwt = authService.createUser(req);
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setMessage("register success");
		res.setRole(USER_ROLE.ROLE_CUSTOMER);
		
		return ResponseEntity.ok(res);
		
	}
	
	
	@PostMapping("/sent-otp")
	public ResponseEntity<ApiResponse>sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception{
		authService.sendLoginOtp(req.getEmail(),req.getRole());
		ApiResponse res = new ApiResponse();
		res.setMessage("otp sent successfully");
		
	
		return ResponseEntity.ok(res);
		
	}
	
	@PostMapping("/signing")
	public ResponseEntity<AuthResponse>loginHandler(@RequestBody LoginRequest req) throws Exception{
		System.out.println("dssssss");
		
		 AuthResponse authResponse= authService.siging(req);
		
		return ResponseEntity.ok(authResponse);
		
	}

}
