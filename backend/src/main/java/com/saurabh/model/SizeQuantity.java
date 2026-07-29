package com.saurabh.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class SizeQuantity {

    private String size;

    private Integer quantity;

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public SizeQuantity(String size, Integer quantity) {
		super();
		this.size = size;
		this.quantity = quantity;
	}

	public SizeQuantity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
}