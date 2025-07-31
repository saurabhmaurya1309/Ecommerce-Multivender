package com.saurabh.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.saurabh.config.JwtProvider;
import com.saurabh.domain.USER_ROLE;
import com.saurabh.model.Cart;
import com.saurabh.model.User;
import com.saurabh.repository.CartRepository;
import com.saurabh.repository.UserRepository;
import com.saurabh.response.SignupRequest;

import com.saurabh.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public String createUser(SignupRequest req) {
		
		User user =userRepository.findByEmail(req.getEmail());
		
		if(user==null) {
			User createdUser = new User();
			createdUser.setEmail(req.getEmail());
			createdUser.setFullName(req.getFullName());
			createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
			createdUser.setMobile("9792745372");
			createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
			user=userRepository.save(createdUser);
			
			Cart cart  = new Cart();
			cart.setUser(user);
			cartRepository.save(cart);
			
		}
		List<GrantedAuthority>authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(),null,authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return jwtProvider.generateToken(authentication);
	}
	

}
