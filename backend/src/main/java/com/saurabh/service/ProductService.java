package com.saurabh.service;

import java.util.List;

import com.saurabh.exceptions.ProductException;
import com.saurabh.model.Product;
import com.saurabh.model.Seller;
import com.saurabh.request.CreateProductRequest;
import org.springframework.data.domain.Page;

public interface ProductService {
	
	public Product createProduct(CreateProductRequest req,Seller seller) ;
	public void deleteProduct(Long productId) throws ProductException;
	public Product updateProduct(Long productId,Product product) throws ProductException;
	public Product findProductById(Long productId) throws ProductException;
	public List<Product>searchProducts(String query);
	public Page<Product>getAllProducts(String category,String brand,String colors,String sizes,Integer minPrice,Integer maxPrice,String minDiscount,String sort,String stock,Integer pageNumber);
	public List<Product>getProductBySellerId(Long sellerId);
}
