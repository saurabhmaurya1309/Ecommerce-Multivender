package com.saurabh.service;

import java.util.List;


import com.saurabh.model.Order;
import com.saurabh.model.Seller;
import com.saurabh.model.Transaction;


public interface TransactionService {
	Transaction createTransaction(Order order);
	List<Transaction>getTransactionsBySellerId(Seller seller);
	List<Transaction>getAllTransactions();
	

}
