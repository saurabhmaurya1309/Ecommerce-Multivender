package com.saurabh.controller;

import java.awt.color.ProfileDataException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.exceptions.ProductException;
import com.saurabh.model.Product;
import com.saurabh.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	
	private final ProductService productService;

	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
	}
	
	
	@GetMapping("/{productId}")
	public ResponseEntity<Product>getProductById(@PathVariable Long productId) throws ProductException{
		Product product =productService.findProductById(productId);
		return new ResponseEntity<>(product,HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Product>>searchProduct(@RequestParam(required = false) String query){
		List<Product>products=productService.searchProducts(query);
		return new ResponseEntity<>(products,HttpStatus.OK);
	}
	@GetMapping
	public ResponseEntity<Page<Product>>getAllProducts(
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String brand,
			@RequestParam(required = false) String color,
			@RequestParam(required = false) String size,
			@RequestParam(required = false) Integer minPrice,
			@RequestParam(required = false) Integer maxPrice,
			@RequestParam(required = false) Integer minDiscount,
			@RequestParam(required = false) String sort,
			@RequestParam(required = false) String stock,
			@RequestParam(defaultValue = "0") Integer pageNumber
			){
		return new ResponseEntity<>(productService.getAllProducts(category, brand,
				                         color, size, minPrice,
				                         maxPrice, size, sort, stock, pageNumber),HttpStatus.OK);
		
	}
	
}
