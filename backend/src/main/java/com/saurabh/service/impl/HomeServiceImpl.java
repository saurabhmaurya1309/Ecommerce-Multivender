package com.saurabh.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.saurabh.domain.HomeCategorySection;
import com.saurabh.model.Deal;
import com.saurabh.model.Home;
import com.saurabh.model.HomeCategory;
import com.saurabh.repository.DealRepository;
import com.saurabh.service.HomeService;

@Service
public class HomeServiceImpl  implements HomeService{
	
	private final DealRepository dealRepository;

	public HomeServiceImpl(DealRepository dealRepository) {
		super();
		this.dealRepository = dealRepository;
	}

	@Override
	public Home createHomePageData(List<HomeCategory> allCategories) {
		List<HomeCategory> gridCategories=allCategories.stream()
					.filter(category->category.getSection()==HomeCategorySection.GRID)
					.collect(Collectors.toList());
		
		List<HomeCategory> shopByCategories=allCategories.stream()
				.filter(category->category.getSection()==HomeCategorySection.SHOP_BY_CATEGORIES)
				.collect(Collectors.toList());
		
		List<HomeCategory> elctricCategories=allCategories.stream()
				.filter(category->category.getSection()==HomeCategorySection.ELECTRIC_CATEGORIES)
				.collect(Collectors.toList());
		
		List<HomeCategory> dealCategories=allCategories.stream()
				.filter(category->category.getSection()==HomeCategorySection.DEALS)
				.collect(Collectors.toList());
		
		List<Deal>createDeals = new ArrayList<>();
		if(dealRepository.findAll().isEmpty()) {
			List<Deal> deals= allCategories.stream()
					.filter(category->category.getSection()==HomeCategorySection.DEALS)
					.map(category-> new Deal(null,10,category))
					.collect(Collectors.toList());
			
			createDeals=dealRepository.saveAll(deals);
		}
		else {
			createDeals=dealRepository.findAll();
		}
		
		Home home = new Home();
		
			home.setDealCategories(dealCategories);
			home.setGrid(gridCategories);
			home.setDeals(createDeals);
			home.setElectricCategories(elctricCategories);
			home.setShopByCategories(shopByCategories);
			
			return home;
		
	}
	
	

}
