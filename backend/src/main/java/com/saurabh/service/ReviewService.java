package com.saurabh.service;

import java.util.List;

import com.saurabh.model.Product;
import com.saurabh.model.Review;
import com.saurabh.model.User;
import com.saurabh.request.CreateReviewRequest;

public interface ReviewService {
	Review createReview(CreateReviewRequest req,User user,Product product);
	List<Review>getReviewByProductId(Long productId);
	Review updateReview(Long reviewId,String reviewText,double rating,long userId) throws Exception;
	void deleteReview(Long reviewId,Long userId) throws Exception;
	Review getReviewById(Long reviewId) throws Exception;

}
