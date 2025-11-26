package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.config.JwtProvider;
import com.saurabh.model.User;
import com.saurabh.repository.UserRepository;
import com.saurabh.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	
	

	public UserServiceImpl(UserRepository userRepository,JwtProvider jwtProvider) {
		this.userRepository = userRepository;
		this.jwtProvider=jwtProvider;
	}

	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		User user = this.findUserByEmail(email);
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		
		User user =userRepository.findByEmail(email);
		if(user==null) {
			throw new Exception("user not found with email -"+email);
		}
		return user;
	}

}
