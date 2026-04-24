package com.saurabh.service;

import java.util.List;

import com.saurabh.model.Home;
import com.saurabh.model.HomeCategory;

public interface HomeService {
	Home createHomePageData(List<HomeCategory>allCategories);

}
