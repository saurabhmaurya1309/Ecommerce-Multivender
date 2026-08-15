package com.saurabh.controller;

import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.CustomerAddress;
import com.saurabh.model.User;
import com.saurabh.service.UserService;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}


	@GetMapping("/users/profile")
	public ResponseEntity<User>getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
		User user=userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(user);
		
	}
	
	@PostMapping("/users/addresses")
    public ResponseEntity<User> addAddress(
            @RequestBody CustomerAddress customerAddress,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        User updatedUser = userService.addAddress(user, customerAddress);

        return ResponseEntity.ok(updatedUser);
    }
	
	@PutMapping("/users/addresses/{addressId}")
	public ResponseEntity<User> updateAddress(
	        @PathVariable Long addressId,
	        @RequestBody CustomerAddress customerAddress,
	        @RequestHeader("Authorization") String jwt)
	        throws Exception {

	    User user =
	            userService.findUserByJwtToken(jwt);

	    User updatedUser =
	            userService.updateAddress(
	                    user,
	                    addressId,
	                    customerAddress
	            );

	    return ResponseEntity.ok(updatedUser);
	}
	
	@DeleteMapping("/users/addresses/{addressId}")
	public ResponseEntity<User> deleteAddress(
	        @PathVariable Long addressId,
	        @RequestHeader("Authorization") String jwt)
	        throws Exception {

	    User user =
	            userService.findUserByJwtToken(jwt);

	    User updatedUser =
	            userService.deleteAddress(
	                    user,
	                    addressId
	            );

	    return ResponseEntity.ok(updatedUser);
	}
	
	
	

}
