package com.saurabh.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String reviewText;
	
	@Column(nullable = false)
	private double rating;
	
	@ElementCollection
	private List<String>productImage;
	
	@JsonIgnore
	@ManyToOne
	private Product product;
	
	@ManyToOne
	private User user;
	
	@Column(nullable = false)
	private LocalDateTime createAt=LocalDateTime.now();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public List<String> getProductImage() {
		return productImage;
	}

	public void setProductImage(List<String> productImage) {
		this.productImage = productImage;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public Review(Long id, String reviewText, double rating, List<String> productImage, Product product, User user,
			LocalDateTime createAt) {
		super();
		this.id = id;
		this.reviewText = reviewText;
		this.rating = rating;
		this.productImage = productImage;
		this.product = product;
		this.user = user;
		this.createAt = createAt;
	}

	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(createAt, id, product, productImage, rating, reviewText, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Review other = (Review) obj;
		return Objects.equals(createAt, other.createAt) && Objects.equals(id, other.id)
				&& Objects.equals(product, other.product) && Objects.equals(productImage, other.productImage)
				&& Double.doubleToLongBits(rating) == Double.doubleToLongBits(other.rating)
				&& Objects.equals(reviewText, other.reviewText) && Objects.equals(user, other.user);
	}
	
	
	
	
	

}
