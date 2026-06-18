package com.saurabh.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.repository.UserRepository;
import com.saurabh.request.LoginRequest;
import com.saurabh.request.ResetPasswordRequest;
import com.saurabh.request.SendOtpRequest;
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
	public ResponseEntity<ApiResponse> createUserHandler(
	        @RequestBody SignupRequest req)
	        throws Exception {

	    authService.createUser(req);

	    ApiResponse res = new ApiResponse();
	    res.setMessage(
	    		"Account created successfully."
	    );

	    return ResponseEntity.ok(res);
	}
	
	
	@PostMapping("/send-otp")
	public ResponseEntity<ApiResponse> sendOtpHandler(
	        @RequestBody SendOtpRequest req)
	        throws Exception {

	    authService.sendOtp(
	            req.getEmail(),
	            req.getPurpose(),
	            req.getRole()
	    );

	    ApiResponse res = new ApiResponse();
	    res.setMessage("OTP sent successfully");

	    return ResponseEntity.ok(res);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginHandler(
	        @RequestBody LoginRequest req)
	        throws Exception {

	    AuthResponse authResponse =
	            authService.login(req);

	    return ResponseEntity.ok(authResponse);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(
	        @RequestBody ResetPasswordRequest request
	) throws Exception {

	    authService.resetPassword(
	            request,
	            USER_ROLE.ROLE_CUSTOMER
	    );

	    return ResponseEntity.ok(
	            Map.of(
	                    "message",
	                    "Password updated successfully"
	            )
	    );
	}

}
