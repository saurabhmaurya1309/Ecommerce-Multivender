package com.saurabh.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne
	private User user;
	
	@OneToMany(mappedBy = "cart",cascade=CascadeType.ALL,orphanRemoval =true )
	private Set<CartItem>cartItems =  new HashSet<>();
	
	private double totalSellingPrice;
	
	private int toatalItem;
	
	private int totalMrpPrice;
	
	private int discount;
	
	private String couponCode;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(Set<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public double getTotalSellingPrice() {
		return totalSellingPrice;
	}

	public void setTotalSellingPrice(double totalSellingPrice) {
		this.totalSellingPrice = totalSellingPrice;
	}

	public int getToatalItem() {
		return toatalItem;
	}

	public void setToatalItem(int toatalItem) {
		this.toatalItem = toatalItem;
	}

	public int getTotalMrpPrice() {
		return totalMrpPrice;
	}

	public void setTotalMrpPrice(int totalMrpPrice) {
		this.totalMrpPrice = totalMrpPrice;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public Cart(Long id, User user, Set<CartItem> cartItems, double totalSellingPrice, int toatalItem,
			int totalMrpPrice, int discount, String couponCode) {
		super();
		this.id = id;
		this.user = user;
		this.cartItems = cartItems;
		this.totalSellingPrice = totalSellingPrice;
		this.toatalItem = toatalItem;
		this.totalMrpPrice = totalMrpPrice;
		this.discount = discount;
		this.couponCode = couponCode;
	}

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(couponCode, discount, id, toatalItem, totalMrpPrice, totalSellingPrice, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cart other = (Cart) obj;
		return Objects.equals(couponCode, other.couponCode) && discount == other.discount
				&& Objects.equals(id, other.id) && toatalItem == other.toatalItem
				&& totalMrpPrice == other.totalMrpPrice
				&& Double.doubleToLongBits(totalSellingPrice) == Double.doubleToLongBits(other.totalSellingPrice)
				&& Objects.equals(user, other.user);
	}
	
	
	

}
