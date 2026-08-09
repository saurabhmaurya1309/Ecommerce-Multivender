package com.saurabh.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	private  int mrpPrice;
	
	private int sellingPrice;
	
	private int discountPercent;
	
	
	private String color;
	
	@ElementCollection
	private List<String>images=new ArrayList<>();
	
	private int numRatings;
	
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private Seller seller;
	
	private LocalDateTime createdAt;
	
	@ElementCollection
	private List<SizeQuantity> sizeQuantities = new ArrayList<>();
	
	private boolean active = true;
	
	@OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Review>reviews = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getMrpPrice() {
		return mrpPrice;
	}

	public void setMrpPrice(int mrpPrice) {
		this.mrpPrice = mrpPrice;
	}

	public int getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(int sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public int getDiscountPercent() {
		return discountPercent;
	}

	public void setDiscountPercent(int discountPercent) {
		this.discountPercent = discountPercent;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public int getNumRatings() {
		return numRatings;
	}

	public void setNumRatings(int numRatings) {
		this.numRatings = numRatings;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Seller getSeller() {
		return seller;
	}

	public void setSeller(Seller seller) {
		this.seller = seller;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<SizeQuantity> getSizeQuantities() {
		return sizeQuantities;
	}

	public void setSizeQuantities(List<SizeQuantity> sizeQuantities) {
		this.sizeQuantities = sizeQuantities;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public Product(Long id, String title, String description, int mrpPrice, int sellingPrice, int discountPercent,
			String color, List<String> images, int numRatings, Category category, Seller seller,
			LocalDateTime createdAt, List<SizeQuantity> sizeQuantities, boolean active, List<Review> reviews) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.mrpPrice = mrpPrice;
		this.sellingPrice = sellingPrice;
		this.discountPercent = discountPercent;
		this.color = color;
		this.images = images;
		this.numRatings = numRatings;
		this.category = category;
		this.seller = seller;
		this.createdAt = createdAt;
		this.sizeQuantities = sizeQuantities;
		this.active = active;
		this.reviews = reviews;
	}

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	

}
