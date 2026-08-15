package com.saurabh.service;

import com.saurabh.model.CustomerAddress;
import com.saurabh.model.User;

public interface UserService {
	
	
	 User findUserByJwtToken(String jwt) throws Exception;
	 User findUserByEmail(String email) throws Exception;
	User addAddress(User user, CustomerAddress customerAddress) throws Exception;
	User updateAddress(User user, Long addressId, CustomerAddress customerAddress) throws Exception;
	User deleteAddress(User user, Long addressId) throws Exception;

}
