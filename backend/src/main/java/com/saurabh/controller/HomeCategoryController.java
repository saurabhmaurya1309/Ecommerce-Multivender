package com.saurabh.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Home;
import com.saurabh.model.HomeCategory;
import com.saurabh.service.HomeCategoryService;
import com.saurabh.service.HomeService;

@RestController
@RequestMapping()
public class HomeCategoryController {
	private final HomeCategoryService homeCategoryService;
	private final HomeService homeService;

	public HomeCategoryController(HomeCategoryService homeCategoryService, HomeService homeService) {
		super();
		this.homeCategoryService = homeCategoryService;
		this.homeService = homeService;
	}

	@PostMapping("/home/categories")
	public ResponseEntity<Home>createHomeCategories(@RequestBody List<HomeCategory>homeCategories){
		List<HomeCategory>categories =homeCategoryService.createHomeCategories(homeCategories);
		Home home =homeService.createHomePageData(categories);
		return ResponseEntity.ok(home);
	}
	
	@GetMapping("/admin/home-category")
	public ResponseEntity<List<HomeCategory>>getHomeCategory(){
		List<HomeCategory>categories=homeCategoryService.getAllHomeCategories();
		return ResponseEntity.ok(categories);
				
				
	}
	
	@PatchMapping("/admin/home-category/{id}")
	public ResponseEntity<HomeCategory>updateHomeCategory(@PathVariable Long id,@RequestBody HomeCategory homeCategory) throws Exception{
		HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
		return ResponseEntity.ok(updatedCategory);
	}
}
