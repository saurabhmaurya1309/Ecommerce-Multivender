package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.config.JwtProvider;
import com.saurabh.model.CustomerAddress;
import com.saurabh.model.User;
import com.saurabh.repository.CustomerAddressRepository;
import com.saurabh.repository.UserRepository;
import com.saurabh.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	private final UserRepository userRepository;
	private final CustomerAddressRepository customerAddressRepository;
	private final JwtProvider jwtProvider;
	
	

	public UserServiceImpl(UserRepository userRepository,JwtProvider jwtProvider, CustomerAddressRepository customerAddressRepository) {
		this.userRepository = userRepository;
		this.customerAddressRepository = customerAddressRepository;
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

	@Override
	public User addAddress(User user, CustomerAddress address) throws Exception {

	    address.setUser(user);

	    user.getAddresses().add(address);

	    return userRepository.save(user);
	}

	@Override
	public User updateAddress(
	        User user,
	        Long addressId,
	        CustomerAddress updatedAddress) throws Exception {

	    CustomerAddress existingAddress =
	            customerAddressRepository.findById(addressId)
	                    .orElseThrow(() ->
	                            new Exception("Address not found"));

	    // Security check
	    if (!existingAddress.getUser().getId()
	            .equals(user.getId())) {

	        throw new Exception(
	                "You are not authorized to update this address"
	        );
	    }

	    existingAddress.setName(updatedAddress.getName());
	    existingAddress.setMobile(updatedAddress.getMobile());
	    existingAddress.setAddress(updatedAddress.getAddress());
	    existingAddress.setLocality(updatedAddress.getLocality());
	    existingAddress.setCity(updatedAddress.getCity());
	    existingAddress.setState(updatedAddress.getState());
	    existingAddress.setPincode(updatedAddress.getPincode());

	    customerAddressRepository.save(existingAddress);

	    return userRepository.findById(user.getId())
	            .orElseThrow(() ->
	                    new Exception("User not found"));
	}

	@Override
	public User deleteAddress(
	        User user,
	        Long addressId) throws Exception {

	    CustomerAddress address =
	            customerAddressRepository.findById(addressId)
	                    .orElseThrow(() ->
	                            new Exception("Address not found"));

	    if (!address.getUser().getId()
	            .equals(user.getId())) {

	        throw new Exception(
	                "You are not authorized to delete this address"
	        );
	    }

	    user.getAddresses().remove(address);

	    customerAddressRepository.delete(address);

	    return userRepository.findById(user.getId())
	            .orElseThrow(() ->
	                    new Exception("User not found"));
	}

}
