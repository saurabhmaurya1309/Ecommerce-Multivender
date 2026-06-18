package com.saurabh.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.model.Seller;
import com.saurabh.model.User;
import com.saurabh.repository.SellerRepository;
import com.saurabh.repository.UserRepository;

@Service
public class CustomUserServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SellerRepository sellerRepository;
	

	

	@Override
	public UserDetails loadUserByUsername(String username)
	        throws UsernameNotFoundException {

	    User user = userRepository.findByEmail(username);

	    if (user == null) {
	        throw new UsernameNotFoundException(
	                "User not found"
	        );
	    }

	    return buildUserDetails(
	            user.getEmail(),
	            user.getPassword(),
	            user.getRole()
	    );
	}


	private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
		if(role ==null) {
			role=USER_ROLE.ROLE_CUSTOMER;
		}
		List<GrantedAuthority>authorityList = new ArrayList<>();
		authorityList.add(new SimpleGrantedAuthority(role.toString()));
		
		return new org.springframework.security.core.userdetails.User(email,password,authorityList);
	}
	
	public UserDetails loadSellerByUsername(
	        String email
	) {

	    Seller seller =
	            sellerRepository.findByEmail(email);

	    if (seller == null) {
	        throw new UsernameNotFoundException(
	                "Seller not found"
	        );
	    }

	    return buildUserDetails(
	            seller.getEmail(),
	            seller.getPassword(),
	            seller.getRole()
	    );
	}

}
