package com.saurabh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.domain.AccountStatus;
import com.saurabh.exceptions.SellerException;
import com.saurabh.model.Seller;
import com.saurabh.model.VerificationCode;
import com.saurabh.repository.VerificationCodeRepository;
import com.saurabh.request.LoginRequest;
import com.saurabh.response.AuthResponse;
import com.saurabh.service.AuthService;
import com.saurabh.service.EmailService;
import com.saurabh.service.SellerService;
import com.saurabh.utils.OtpUtil;
@RestController
@RequestMapping("/sellers")
public class SellerController {
	private final SellerService sellerService;
	private final VerificationCodeRepository verificationCodeRepository;
	private final AuthService authService;
	private final EmailService emailService;

	public SellerController(SellerService sellerService, VerificationCodeRepository verificationCodeRepository, AuthService authService, EmailService emailService) {
		this.sellerService = sellerService;
		this.verificationCodeRepository = verificationCodeRepository;
		this.authService = authService;
		this.emailService = emailService;
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse>loginSeller(@RequestBody LoginRequest req) throws Exception{
		String otp= req.getOtp();
		String email=req.getEmail();
		req.setOtp(otp);
		req.setEmail("seller_"+email);
		AuthResponse authResponse=authService.siging(req);
		return ResponseEntity.ok(authResponse);
		
	}
	
	@PatchMapping("/verify/{otp}")
	public ResponseEntity<Seller>verifySellerEmail(@PathVariable String otp) throws Exception{
		VerificationCode verificationCode=verificationCodeRepository.findByOtp(otp);
		if(verificationCode ==null || !verificationCode.getOtp().equals(otp)) {
			throw new Exception("wrong otp ...");
		}
		Seller seller =sellerService.verifyEmail(verificationCode.getEmail(), otp);
		return new ResponseEntity<>(seller,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Seller>createSeller(@RequestBody Seller seller) throws Exception{
		Seller savedSeller=sellerService.createSeller(seller);
		String otp=OtpUtil.generateOtp();
		VerificationCode verificationCode=new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(seller.getEmail());
		verificationCodeRepository.save(verificationCode);
		
		String subject ="Saurabh Market Email Verification Code";
		String text = "Welcome to Saurabh Market, verify your account using this link";
		String forntend_url="https://localhost:3000/verify-seller/";
		emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject, text+forntend_url);
	
		return new ResponseEntity<>(savedSeller,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Seller>getSellerById(@PathVariable Long id) throws SellerException{
		Seller seller =sellerService.getSellerById(id);
		return new ResponseEntity<>(seller,HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<Seller>getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
		Seller seller =sellerService.getSellerProfile(jwt);
		return new ResponseEntity<>(seller,HttpStatus.OK);
		
	}
	
	//6:43
	
	@GetMapping
	public ResponseEntity<List<Seller>>getAllSellers(@RequestParam(required = false) AccountStatus status){
		List<Seller>sellers=sellerService.getAllSellers(status);
		return ResponseEntity.ok(sellers);
	}
	
	@PatchMapping
	public ResponseEntity<Seller>updateSeller(@RequestHeader("Authorization") String jwt,@RequestBody Seller seller) throws Exception{
		Seller profile =sellerService.getSellerProfile(jwt);
		Seller updatedSeller=sellerService.updateSeller(profile.getId(), seller);
		return ResponseEntity.ok(updatedSeller);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void>deleteSeller(@PathVariable Long id) throws Exception{
		sellerService.deleteSeller(id);
		return ResponseEntity.noContent().build();
	}

}
