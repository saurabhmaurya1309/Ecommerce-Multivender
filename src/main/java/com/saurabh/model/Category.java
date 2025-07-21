
package com.saurabh.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull
	@Column(unique = true)
	private String categoryId;
	
	@ManyToOne
	private Category parentCategory;
	
	@NotNull
	private Integer level;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public Category getParentCategory() {
		return parentCategory;
	}

	public void setParentCategory(Category parentCategory) {
		this.parentCategory = parentCategory;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Category(Long id, @NotNull String categoryId, Category parentCategory, @NotNull Integer level) {
		super();
		this.id = id;
		this.categoryId = categoryId;
		this.parentCategory = parentCategory;
		this.level = level;
	}

	public Category() {
		super();
		
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", categoryId=" + categoryId + ", parentCategory=" + parentCategory + ", level="
				+ level + "]";
	}
	
	
	

}
