package com.saurabh.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.saurabh.model.HomeCategory;
import com.saurabh.repository.HomeCategoryRepository;
import com.saurabh.service.HomeCategoryService;
@Service
public class HomeCategoryServiceImpl implements HomeCategoryService {
	private final HomeCategoryRepository homeCategoryRepository;

	public HomeCategoryServiceImpl(HomeCategoryRepository homeCategoryRepository) {
		super();
		this.homeCategoryRepository = homeCategoryRepository;
	}

	@Override
	public HomeCategory createHomeCategory(HomeCategory homeCategory) {
		return homeCategoryRepository.save(homeCategory);
	}

	@Override
	public List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories) {
		if(homeCategoryRepository.findAll().isEmpty()) {
			return homeCategoryRepository.saveAll(homeCategories);
			
		}
		return homeCategoryRepository.findAll();
 		
	}

	@Override
	public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
		HomeCategory existingCategory=homeCategoryRepository.findById(id).orElseThrow(()-> new Exception("Category not found"));
		if(homeCategory.getImage()!=null) {
			existingCategory.setImage(homeCategory.getImage());
		}
		if(homeCategory.getCategoryId()!=null) {
			existingCategory.setCategoryId(homeCategory.getCategoryId());
		}
		
		
		return homeCategoryRepository.save(existingCategory);
	}

	@Override
	public List<HomeCategory> getAllHomeCategories() {
		
		return homeCategoryRepository.findAll();
	}

}
