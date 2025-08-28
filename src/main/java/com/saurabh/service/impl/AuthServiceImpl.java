package com.saurabh.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.saurabh.config.JwtProvider;
import com.saurabh.domain.USER_ROLE;
import com.saurabh.model.Cart;
import com.saurabh.model.Seller;
import com.saurabh.model.User;
import com.saurabh.model.VerificationCode;
import com.saurabh.repository.CartRepository;
import com.saurabh.repository.SellerRepository;
import com.saurabh.repository.UserRepository;
import com.saurabh.repository.VerificationCodeRepository;
import com.saurabh.request.LoginRequest;
import com.saurabh.response.AuthResponse;
import com.saurabh.response.SignupRequest;

import com.saurabh.service.AuthService;
import com.saurabh.service.EmailService;
import com.saurabh.utils.OtpUtil;

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
	
	@Autowired
	private VerificationCodeRepository verificationCodeRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private CustomUserServiceImpl customUserServiceImpl;
	
	@Autowired
	private SellerRepository sellerRepository;

	@Override
	public String createUser(SignupRequest req) throws Exception {
		
		VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
		if(verificationCode==null || !verificationCode.getOtp().equals(req.getOtp())) {
			throw new Exception("wrong otp...");
		}
		
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

	@Override
	public void sendLoginOtp(String email,USER_ROLE role) throws Exception {
		String SIGNING_PREFIX="sigining_";
		if(email.startsWith(SIGNING_PREFIX)) {
			email=email.substring(SIGNING_PREFIX.length());
			if(role.equals(USER_ROLE.ROLE_SELLER)) {
				Seller seller=sellerRepository.findByEmail(email);
				if(seller==null) {
					throw new Exception("seller not found");
				}
				
				
			}
			else {
				User user=userRepository.findByEmail(email);
				if(user==null) {
					throw new Exception("user not exist with provided email"); 
				}
				
			}
			
		}
		
		VerificationCode isExist = verificationCodeRepository.findByEmail(email);
		if(isExist!=null) {
			verificationCodeRepository.delete(isExist);
		}
		
		String otp = OtpUtil.generateOtp();
		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(email);
		verificationCodeRepository.save(verificationCode);
		
		String subject = "Saurabh Market login/signup otp";
		String text= "your login/signup otp is -"+otp;
		emailService.sendVerificationOtpEmail(email, otp, subject, text);
		
	}

	@Override
	public AuthResponse siging(LoginRequest req) {
		String username=req.getEmail();
		String otp=req.getOtp();
		Authentication authentication =authenticate(username,otp);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login Success");
		
		Collection<? extends GrantedAuthority>authorities=authentication.getAuthorities();
		
		String roleName=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
		
		authResponse.setRole(USER_ROLE.valueOf(roleName));
		
		return authResponse;
	}

	private Authentication authenticate(String username, String otp) {
		
		UserDetails userDetails= customUserServiceImpl.loadUserByUsername(username);
		String SELLER_PREFIX="seller_";
		if(username.startsWith(SELLER_PREFIX)) {
			username=username.substring((SELLER_PREFIX.length()));
		}
		
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
			
		}
		
		VerificationCode verificationCode=verificationCodeRepository.findByEmail(username);
		if(verificationCode==null || !verificationCode.getOtp().equals(otp)) {
			throw new BadCredentialsException("wrong otp");
		}
		
		
		return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
	}
	

}
