package com.saurabh.controller;

import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.User;
import com.saurabh.service.UserService;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}


	@GetMapping("/users/profile")
	public ResponseEntity<User>kj(@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user=userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(user);
		
	}
	
	
	

}
