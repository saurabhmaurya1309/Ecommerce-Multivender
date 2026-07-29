package com.saurabh.request;

import java.util.List;

import com.saurabh.model.SizeQuantity;

public class UpdateProductRequest {

    private String title;

    private String description;

    private Integer mrpPrice;

    private Integer sellingPrice;

    private String color;

    private List<String> images;

    private List<SizeQuantity> sizeQuantities;

    private String category;

    private String category2;

    private String category3;

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

	public List<SizeQuantity> getSizeQuantities() {
		return sizeQuantities;
	}

	public void setSizeQuantities(List<SizeQuantity> sizeQuantities) {
		this.sizeQuantities = sizeQuantities;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCategory2() {
		return category2;
	}

	public void setCategory2(String category2) {
		this.category2 = category2;
	}

	public String getCategory3() {
		return category3;
	}

	public void setCategory3(String category3) {
		this.category3 = category3;
	}

	public UpdateProductRequest(String title, String description, Integer mrpPrice, Integer sellingPrice, String color,
			List<String> images, List<SizeQuantity> sizeQuantities, String category, String category2,
			String category3) {
		super();
		this.title = title;
		this.description = description;
		this.mrpPrice = mrpPrice;
		this.sellingPrice = sellingPrice;
		this.color = color;
		this.images = images;
		this.sizeQuantities = sizeQuantities;
		this.category = category;
		this.category2 = category2;
		this.category3 = category3;
	}

	public UpdateProductRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}