package com.saurabh.service;

import java.util.List;

import com.saurabh.model.HomeCategory;

public interface HomeCategoryService  {
	HomeCategory createHomeCategory(HomeCategory homeCategory);
	List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories);
	HomeCategory updateHomeCategory(HomeCategory homeCategory,Long id) throws Exception;
	List<HomeCategory> getAllHomeCategories();

}
