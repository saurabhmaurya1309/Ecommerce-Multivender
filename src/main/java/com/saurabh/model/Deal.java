package com.saurabh.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Deal {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private Integer discount;
	
	@OneToOne
	private HomeCategory category;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public HomeCategory getCategory() {
		return category;
	}

	public void setCategory(HomeCategory category) {
		this.category = category;
	}

	public Deal(Long id, Integer discount, HomeCategory category) {
		super();
		this.id = id;
		this.discount = discount;
		this.category = category;
	}

	public Deal() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(category, discount, id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Deal other = (Deal) obj;
		return Objects.equals(category, other.category) && Objects.equals(discount, other.discount)
				&& Objects.equals(id, other.id);
	}
	
	
	
	

}
