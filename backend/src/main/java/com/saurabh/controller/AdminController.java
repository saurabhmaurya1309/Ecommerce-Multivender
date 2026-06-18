package com.saurabh.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.domain.AccountStatus;
import com.saurabh.model.Seller;
import com.saurabh.service.SellerService;

@RestController
@RequestMapping("/api")
public class AdminController {
	private final SellerService sellerService;

	public AdminController(SellerService sellerService) {
		super();
		this.sellerService = sellerService;
	}
	
	@PatchMapping("/seller/{id}/status/{status}")
	public ResponseEntity<Seller>updateSellerStatus(
			@PathVariable Long id,
			@PathVariable AccountStatus status
			) throws Exception{
		Seller updateSeller = sellerService.updateSellerAccountStatus(id, status);
		return ResponseEntity.ok(updateSeller);
	}

}
