package com.saurabh.service;

import java.util.List;

import com.saurabh.model.Deal;

public interface DealService  {
	List<Deal>getDeals();
	Deal createDeal(Deal deal);
	Deal updateDeal(Deal deal,Long id) throws Exception;
	void deleteDeal(Long id) throws Exception;

}
