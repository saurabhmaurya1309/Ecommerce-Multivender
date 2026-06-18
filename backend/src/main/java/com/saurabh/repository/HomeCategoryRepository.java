package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {
	

}
