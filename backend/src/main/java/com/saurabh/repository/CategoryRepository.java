package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Category;

public interface CategoryRepository  extends JpaRepository<Category, Long>{
	Category findByCategoryId(String categoryId);

}
