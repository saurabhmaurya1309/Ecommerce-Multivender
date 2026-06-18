package com.saurabh.service.impl;

import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.saurabh.config.JwtProvider;
import com.saurabh.domain.USER_ROLE;
import com.saurabh.domain.VerificationPurpose;
import com.saurabh.model.Cart;
import com.saurabh.model.Seller;
import com.saurabh.model.User;
import com.saurabh.model.VerificationCode;
import com.saurabh.repository.CartRepository;
import com.saurabh.repository.SellerRepository;
import com.saurabh.repository.UserRepository;
import com.saurabh.repository.VerificationCodeRepository;
import com.saurabh.request.LoginRequest;
import com.saurabh.request.ResetPasswordRequest;
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
	public void createUser(SignupRequest req) throws Exception {
		VerificationCode verificationCode = verificationCodeRepository.findByEmailAndPurpose(req.getEmail(),
				VerificationPurpose.EMAIL_VERIFICATION);

		if (verificationCode == null) {
			throw new Exception("OTP not found");
		}

		if (!verificationCode.getOtp().equals(req.getOtp())) {
			throw new Exception("Invalid OTP");
		}

		if (verificationCode.getExpiryTime() == null
				|| verificationCode.getExpiryTime().isBefore(LocalDateTime.now())) {

			throw new Exception("OTP expired");
		}

		User existingUser = userRepository.findByEmail(req.getEmail());

		if (existingUser != null) {
			throw new Exception("Email already registered");
		}

		User user = new User();

		user.setEmail(req.getEmail());
		user.setFullName(req.getFullName());
		user.setRole(USER_ROLE.ROLE_CUSTOMER);

		user.setPassword(passwordEncoder.encode(req.getPassword()));

		user.setEmailVerified(true);

		User savedUser = userRepository.save(user);

		Cart cart = new Cart();
		cart.setUser(savedUser);

		cartRepository.save(cart);

		verificationCodeRepository.delete(verificationCode);
	}

	@Override
	public void sendOtp(String email, VerificationPurpose purpose, USER_ROLE role) throws Exception {

		validateOtpRequest(email, purpose, role);

		VerificationCode existingCode = verificationCodeRepository.findByEmailAndPurpose(email, purpose);

		if (existingCode != null) {
			verificationCodeRepository.delete(existingCode);
		}

		String otp = OtpUtil.generateOtp();

		VerificationCode verificationCode = new VerificationCode();

		verificationCode.setEmail(email);
		verificationCode.setOtp(otp);
		verificationCode.setPurpose(purpose);
		verificationCode.setExpiryTime(LocalDateTime.now().plusMinutes(10));

		verificationCodeRepository.save(verificationCode);

		String subject = "Saurabh Market OTP";
		String text = "Your OTP is: " + otp;

		emailService.sendVerificationOtpEmail(email, otp, subject, text);
	}

	@Override
	public AuthResponse login(LoginRequest req) throws Exception {
		String email = req.getEmail();
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new Exception("User not found");
		}
		if (!user.isEmailVerified()) {
			throw new Exception("Please verify your email first");
		}
		Authentication authentication = authenticate(email, req.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login Success");

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return authResponse;
	}

	private Authentication authenticate(String email, String password) {

		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(email);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid email");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {

			throw new BadCredentialsException("Invalid password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	private void validateOtpRequest(String email, VerificationPurpose purpose, USER_ROLE role) throws Exception {

		if (role == USER_ROLE.ROLE_CUSTOMER) {

			User user = userRepository.findByEmail(email);
			System.out.print(user);

			if (purpose == VerificationPurpose.EMAIL_VERIFICATION && user != null) {
				throw new Exception("Email already registered");
			}

			if (purpose == VerificationPurpose.PASSWORD_RESET && user == null) {
				throw new Exception("User not found");
			}

		} else if (role == USER_ROLE.ROLE_SELLER) {

			Seller seller = sellerRepository.findByEmail(email);

			if (purpose == VerificationPurpose.EMAIL_VERIFICATION && seller != null) {
				throw new Exception("Seller already registered");
			}

			if (purpose == VerificationPurpose.PASSWORD_RESET && seller == null) {
				throw new Exception("Seller not found");
			}
		}
	}

	@Override
	public AuthResponse loginSeller(LoginRequest req) throws Exception {

		Seller seller = sellerRepository.findByEmail(req.getEmail());

		if (seller == null) {
			throw new Exception("Seller not found");
		}

		if (!seller.emailVerified()) {
			throw new Exception("Please verify your email first");
		}

		Authentication authentication = authenticateSeller(req.getEmail(), req.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse response = new AuthResponse();

		response.setJwt(token);
		response.setMessage("Login Success");
		response.setRole(USER_ROLE.ROLE_SELLER);

		return response;
	}
	private Authentication authenticateSeller(
	        String email,
	        String password
	) {

	    UserDetails userDetails =
	            customUserServiceImpl
	                    .loadSellerByUsername(
	                            email
	                    );

	    if (userDetails == null) {
	        throw new BadCredentialsException(
	                "Invalid email"
	        );
	    }

	    if (!passwordEncoder.matches(
	            password,
	            userDetails.getPassword()
	    )) {

	        throw new BadCredentialsException(
	                "Invalid password"
	        );
	    }

	    return new UsernamePasswordAuthenticationToken(
	            userDetails,
	            null,
	            userDetails.getAuthorities()
	    );
	}

	@Override
	public void resetPassword(ResetPasswordRequest req, USER_ROLE role) throws Exception {

		VerificationCode verificationCode = verificationCodeRepository.findByEmailAndPurpose(req.getEmail(),
				VerificationPurpose.PASSWORD_RESET);

		if (verificationCode == null) {
			throw new Exception("OTP not found");
		}

		if (!verificationCode.getOtp().equals(req.getOtp())) {
			throw new Exception("Invalid OTP");
		}

		if (verificationCode.getExpiryTime().isBefore(LocalDateTime.now())) {

			throw new Exception("OTP expired");
		}

		if (role == USER_ROLE.ROLE_CUSTOMER) {

			User user = userRepository.findByEmail(req.getEmail());

			user.setPassword(passwordEncoder.encode(req.getNewPassword()));

			userRepository.save(user);

		} else {

			Seller seller = sellerRepository.findByEmail(req.getEmail());

			seller.setPassword(passwordEncoder.encode(req.getNewPassword()));

			sellerRepository.save(seller);
		}

		verificationCodeRepository.delete(verificationCode);
	}

}
