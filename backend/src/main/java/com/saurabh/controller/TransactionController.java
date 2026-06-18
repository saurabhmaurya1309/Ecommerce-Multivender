package com.saurabh.controller;

import java.security.PublicKey;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Seller;
import com.saurabh.model.Transaction;
import com.saurabh.service.SellerService;
import com.saurabh.service.TransactionService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	
	private final TransactionService transactionService;
	private final SellerService sellerService;

	public TransactionController(TransactionService transactionService, SellerService sellerService) {
		super();
		this.transactionService = transactionService;
		this.sellerService = sellerService;
	}
	
	@GetMapping("/seller")
	public ResponseEntity<List<Transaction>>getTransactionBySeller(@RequestHeader("Authorization") String jwt) throws Exception {
		Seller seller = sellerService.getSellerProfile(jwt);
		List<Transaction>transactions=transactionService.getTransactionsBySellerId(seller);
		
		return ResponseEntity.ok(transactions);
		
	}
	
	@GetMapping()
	public ResponseEntity<List<Transaction>> getAllTransaction() {
		List<Transaction>transactions=transactionService.getAllTransactions();
		return ResponseEntity.ok(transactions);
	}
	

}
