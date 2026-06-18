package com.saurabh.controller;

import java.util.List;
import java.util.Map;

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
import com.saurabh.domain.USER_ROLE;
import com.saurabh.exceptions.SellerException;
import com.saurabh.model.Seller;
import com.saurabh.model.SellerReport;
import com.saurabh.model.VerificationCode;
import com.saurabh.repository.SellerReportRepository;
import com.saurabh.repository.VerificationCodeRepository;
import com.saurabh.request.LoginRequest;
import com.saurabh.request.ResetPasswordRequest;
import com.saurabh.request.SellerSignupRequest;
import com.saurabh.response.ApiResponse;
import com.saurabh.response.AuthResponse;
import com.saurabh.service.AuthService;
import com.saurabh.service.EmailService;
import com.saurabh.service.SellerReportService;
import com.saurabh.service.SellerService;
import com.saurabh.utils.OtpUtil;
@RestController
@RequestMapping("/sellers")
public class SellerController {
	private final SellerService sellerService;
	private final VerificationCodeRepository verificationCodeRepository;
	private final AuthService authService;
	private final EmailService emailService;
	private final SellerReportService sellerReportService;

	public SellerController(SellerService sellerService, VerificationCodeRepository verificationCodeRepository, AuthService authService, EmailService emailService, SellerReportService sellerReportService) {
		this.sellerService = sellerService;
		this.verificationCodeRepository = verificationCodeRepository;
		this.authService = authService;
		this.emailService = emailService;
		this.sellerReportService = sellerReportService;
		
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginSeller(
	        @RequestBody LoginRequest req)
	        throws Exception {

	    AuthResponse response =
	            authService.loginSeller(req);

	    return ResponseEntity.ok(response);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<ApiResponse> createSeller(
	        @RequestBody SellerSignupRequest req)
	        throws Exception {
	    sellerService.createSeller(req);

	    ApiResponse response = new ApiResponse();
	    response.setMessage(
	            "Seller account created successfully."
	    );

	    return ResponseEntity.ok(response);
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetSellerPassword(
	        @RequestBody ResetPasswordRequest request
	) throws Exception {

	    authService.resetPassword(
	            request,
	            USER_ROLE.ROLE_SELLER
	    );

	    return ResponseEntity.ok(
	            Map.of(
	                    "message",
	                    "Password updated successfully"
	            )
	    );
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
	
	@GetMapping("/report")
	public ResponseEntity<SellerReport>getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception{
		Seller seller = sellerService.getSellerProfile(jwt);
		SellerReport report =sellerReportService.getSellerReport(seller);
		return  new ResponseEntity<>(report,HttpStatus.OK);
		
		
	}
	
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
