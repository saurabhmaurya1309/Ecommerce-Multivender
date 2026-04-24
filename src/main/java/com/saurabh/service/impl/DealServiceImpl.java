package com.saurabh.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.saurabh.model.Deal;
import com.saurabh.model.HomeCategory;
import com.saurabh.repository.DealRepository;
import com.saurabh.repository.HomeCategoryRepository;
import com.saurabh.service.DealService;

@Service
public class DealServiceImpl implements DealService {
	private final DealRepository dealRepository;
	private final HomeCategoryRepository homeCategoryRepository;

	public DealServiceImpl(DealRepository dealRepository, HomeCategoryRepository homeCategoryRepository) {
		super();
		this.dealRepository = dealRepository;
		this.homeCategoryRepository = homeCategoryRepository;
	}

	@Override
	public List<Deal> getDeals() {
		return dealRepository.findAll();
	}

	@Override
	public Deal createDeal(Deal deal) {
		HomeCategory category= homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
		Deal newDeal= dealRepository.save(deal);
		newDeal.setCategory(category);
		newDeal.setDiscount(deal.getDiscount());
		return dealRepository.save(newDeal);
	}

	@Override
	public Deal updateDeal(Deal deal,Long id) throws Exception {
		Deal existingDeal=dealRepository.findById(id).orElseThrow(()->new Exception("Deal is not found"));
		HomeCategory category= homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
		if(deal.getDiscount()!=null) {
			existingDeal.setDiscount(deal.getDiscount());
		}
		if(category!=null) {
			existingDeal.setCategory(category);
		}
		return dealRepository.save(existingDeal);
	}

	@Override
	public void deleteDeal(Long id) throws Exception {
		Deal deal = dealRepository.findById(id).orElseThrow(()-> new Exception("deal not found"));
		
		dealRepository.delete(deal);
		
	}

}
