package com.saurabh.service;

import com.saurabh.model.Seller;
import com.saurabh.model.SellerReport;

public interface SellerReportService {
	
	SellerReport getSellerReport(Seller seller);
	SellerReport updateSellerReport(SellerReport sellerReport);

}
