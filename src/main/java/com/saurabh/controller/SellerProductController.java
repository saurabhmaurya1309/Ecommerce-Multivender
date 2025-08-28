package com.saurabh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.exceptions.ProductException;
import com.saurabh.model.Product;
import com.saurabh.model.Seller;
import com.saurabh.request.CreateProductRequest;
import com.saurabh.service.ProductService;
import com.saurabh.service.SellerService;

@RestController
@RequestMapping("/api/sellers/products")
public class SellerProductController {
	
	private final ProductService productService;
	private final SellerService sellerService;

	public SellerProductController(ProductService productService, SellerService sellerService) {
		super();
		this.productService = productService;
		this.sellerService = sellerService;
	}
	
	
	@GetMapping
	public ResponseEntity<List<Product>>getProductBySellerId(@RequestHeader("Authorization") String jwt) throws Exception{
		Seller seller=sellerService.getSellerProfile(jwt);
		List<Product>products=productService.getProductBySellerId(seller.getId());
		return new ResponseEntity<>(products,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Product>createProduct(
			@RequestBody CreateProductRequest request,
			@RequestHeader("Authorization")String jwt)
		throws Exception{
		Seller seller=sellerService.getSellerProfile(jwt);
		Product product=productService.createProduct(request, seller);
		return new ResponseEntity<>(product,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<Void>deleteProduct(@PathVariable Long productId){
		try {
			productService.deleteProduct(productId);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch(ProductException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{productId}")
	public ResponseEntity<Product>updateProduct(@PathVariable Long productId,@RequestBody Product product) throws ProductException{
		
		Product updatedProduct=productService.updateProduct(productId, product);
		return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
		
	}
	
	

}
