package com.saurabh.service.impl;

import org.springframework.stereotype.Service;

import com.saurabh.model.Seller;
import com.saurabh.model.SellerReport;
import com.saurabh.repository.SellerReportRepository;
import com.saurabh.service.SellerReportService;

@Service
public class SellerReportServiceImpl implements SellerReportService {
	
	private final SellerReportRepository sellerReportRepository;

	public SellerReportServiceImpl(SellerReportRepository sellerReportRepository) {
		super();
		this.sellerReportRepository = sellerReportRepository;
	}

	@Override
	public SellerReport getSellerReport(Seller seller) {
		SellerReport sr=sellerReportRepository.findBySellerId(seller.getId());
		if(sr==null) {
			SellerReport newReport = new SellerReport();
			newReport.setSeller(seller);
			return sellerReportRepository.save(newReport);
		}
		return sr;
	}

	@Override
	public SellerReport updateSellerReport(SellerReport sellerReport) {
		return sellerReportRepository.save(sellerReport);
	}

}
