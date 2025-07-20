package com.saurabh.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JsonIgnore
	private Cart cart;
	
	private Product product;
	
	private String size;
	
	private int quantity =1;
	
	private Integer mrpPrice;
	
	private Integer sellingPrice;
	
	private Long userId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Integer getMrpPrice() {
		return mrpPrice;
	}

	public void setMrpPrice(Integer mrpPrice) {
		this.mrpPrice = mrpPrice;
	}

	public Integer getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(Integer sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public CartItem(Long id, Cart cart, Product product, String size, int quantity, Integer mrpPrice,
			Integer sellingPrice, Long userId) {
		super();
		this.id = id;
		this.cart = cart;
		this.product = product;
		this.size = size;
		this.quantity = quantity;
		this.mrpPrice = mrpPrice;
		this.sellingPrice = sellingPrice;
		this.userId = userId;
	}

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(cart, id, mrpPrice, product, quantity, sellingPrice, size, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CartItem other = (CartItem) obj;
		return Objects.equals(cart, other.cart) && Objects.equals(id, other.id)
				&& Objects.equals(mrpPrice, other.mrpPrice) && Objects.equals(product, other.product)
				&& quantity == other.quantity && Objects.equals(sellingPrice, other.sellingPrice)
				&& Objects.equals(size, other.size) && Objects.equals(userId, other.userId);
	}
	
	

}
