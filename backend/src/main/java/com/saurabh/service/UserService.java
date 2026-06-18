package com.saurabh.service;

import com.saurabh.model.User;

public interface UserService {
	
	
	 User findUserByJwtToken(String jwt) throws Exception;
	 User findUserByEmail(String email) throws Exception;

}
