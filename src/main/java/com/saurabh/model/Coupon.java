package com.saurabh.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Coupon {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String code;
	
	private double discountPercentage ;
	
	private LocalDate validityStartDate;
	
	private LocalDate validityEndDate;
	
	private double minimumOrderValue;
	
	private boolean isActive=true;
	
	@ManyToMany(mappedBy = "usedCoupons")
    private Set<User>usedByUsers =new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public double getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	public LocalDate getValidityStartDate() {
		return validityStartDate;
	}

	public void setValidityStartDate(LocalDate validityStartDate) {
		this.validityStartDate = validityStartDate;
	}

	public LocalDate getValidityEndDate() {
		return validityEndDate;
	}

	public void setValidityEndDate(LocalDate validityEndDate) {
		this.validityEndDate = validityEndDate;
	}

	public double getMinimumOrderValue() {
		return minimumOrderValue;
	}

	public void setMinimumOrderValue(double minimumOrderValue) {
		this.minimumOrderValue = minimumOrderValue;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Set<User> getUsedByUsers() {
		return usedByUsers;
	}

	public void setUsedByUsers(Set<User> usedByUsers) {
		this.usedByUsers = usedByUsers;
	}

	public Coupon(Long id, String code, double discountPercentage, LocalDate validityStartDate,
			LocalDate validityEndDate, double minimumOrderValue, boolean isActive, Set<User> usedByUsers) {
		super();
		this.id = id;
		this.code = code;
		this.discountPercentage = discountPercentage;
		this.validityStartDate = validityStartDate;
		this.validityEndDate = validityEndDate;
		this.minimumOrderValue = minimumOrderValue;
		this.isActive = isActive;
		this.usedByUsers = usedByUsers;
	}

	public Coupon() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(code, discountPercentage, id, isActive, minimumOrderValue, usedByUsers, validityEndDate,
				validityStartDate);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coupon other = (Coupon) obj;
		return Objects.equals(code, other.code)
				&& Double.doubleToLongBits(discountPercentage) == Double.doubleToLongBits(other.discountPercentage)
				&& Objects.equals(id, other.id) && isActive == other.isActive
				&& Double.doubleToLongBits(minimumOrderValue) == Double.doubleToLongBits(other.minimumOrderValue)
				&& Objects.equals(usedByUsers, other.usedByUsers)
				&& Objects.equals(validityEndDate, other.validityEndDate)
				&& Objects.equals(validityStartDate, other.validityStartDate);
	} 
	
	
	
	

}
