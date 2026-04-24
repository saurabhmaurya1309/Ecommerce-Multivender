package com.saurabh.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.saurabh.model.Order;
import com.saurabh.model.Seller;
import com.saurabh.model.Transaction;
import com.saurabh.repository.SellerRepository;
import com.saurabh.repository.TransactionRepository;
import com.saurabh.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {
	private final TransactionRepository transactionRepository;
	private final SellerRepository sellerRepository;

	public TransactionServiceImpl(TransactionRepository transactionRepository, SellerRepository sellerRepository) {
		super();
		this.transactionRepository = transactionRepository;
		this.sellerRepository = sellerRepository;
	}

	@Override
	public Transaction createTransaction(Order order) {
		Seller seller=sellerRepository.findById(order.getSellerId()).get();
		Transaction transaction = new Transaction();
		transaction.setSeller(seller);
		transaction.setCustomer(order.getUser());
		transaction.setOrder(order);
		return transactionRepository.save(transaction);
	}

	@Override
	public List<Transaction> getTransactionsBySellerId(Seller seller) {
		// TODO Auto-generated method stub
		return transactionRepository.findBySellerId(seller.getId());
	}

	@Override
	public List<Transaction> getAllTransactions() {
		
		return transactionRepository.findAll();
	}

}
