package com.saurabh.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Product;
import com.saurabh.model.Review;
import com.saurabh.model.User;
import com.saurabh.request.CreateReviewRequest;
import com.saurabh.response.ApiResponse;
import com.saurabh.service.ProductService;
import com.saurabh.service.ReviewService;
import com.saurabh.service.UserService;

@RestController
@RequestMapping("/api")
public class ReviewController {
	private final ReviewService reviewService;
	private final UserService userService;
	private final ProductService productService;
	public ReviewController(ReviewService reviewService, UserService userService, ProductService productService) {
		super();
		this.reviewService = reviewService;
		this.userService = userService;
		this.productService = productService;
	}
	
	@GetMapping("/products/{productId}/review")
	public ResponseEntity<List<Review>>getReviewByProductId(@PathVariable Long productId){
		List<Review>reviews =reviewService.getReviewByProductId(productId);
		return ResponseEntity.ok(reviews);
	}
	
	@PostMapping("/products/{productId}/review")
	public ResponseEntity<Review> writeReview(
			@RequestBody CreateReviewRequest req,
			@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt
			) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Product product = productService.findProductById(productId);
		Review review = reviewService.createReview(req, user, product);
		return ResponseEntity.ok(review);
	}
	
	@PatchMapping("/review/{reviewId}")
	public ResponseEntity<Review> updateReview(
			@RequestBody CreateReviewRequest req,
			@PathVariable Long reviewId,
			@RequestHeader("Authorization") String jwt
			) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Review review = reviewService.updateReview(reviewId, req.getReviewText(), req.getReviewRating(),user.getId());
		return ResponseEntity.ok(review);
	}
	
	@DeleteMapping("/review/{reviewId}")
	public ResponseEntity<ApiResponse> deleteReview(
			@PathVariable Long reviewId,
			@RequestHeader("Authorization") String jwt
			) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		reviewService.deleteReview(reviewId, user.getId());
		ApiResponse res= new ApiResponse();
		res.setMessage("Review deleted successfully");
		return ResponseEntity.ok(res);
	}
	
	

}
