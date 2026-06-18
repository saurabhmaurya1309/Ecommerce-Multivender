package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
	
	SellerReport findBySellerId(Long SellerId);

}
