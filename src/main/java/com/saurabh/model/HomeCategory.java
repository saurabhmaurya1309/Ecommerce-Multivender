package com.saurabh.model;

import java.util.Objects;

import com.saurabh.domain.HomeCategorySection;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HomeCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String name;
	
	private String image;
	
	private String categoryId;
	
	private HomeCategorySection section;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public HomeCategorySection getSection() {
		return section;
	}

	public void setSection(HomeCategorySection section) {
		this.section = section;
	}

	public HomeCategory(Long id, String name, String image, String categoryId, HomeCategorySection section) {
		super();
		this.id = id;
		this.name = name;
		this.image = image;
		this.categoryId = categoryId;
		this.section = section;
	}

	public HomeCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(categoryId, id, image, name, section);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HomeCategory other = (HomeCategory) obj;
		return Objects.equals(categoryId, other.categoryId) && Objects.equals(id, other.id)
				&& Objects.equals(image, other.image) && Objects.equals(name, other.name) && section == other.section;
	}
	
	
	
	

}
