package com.saurabh.model;


import jakarta.persistence.*;

@Entity
@Table(name = "seller_address")
public class SellerAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String mobile;

    private String locality;

    private String address;

    private String city;

    private String state;

    private String pincode;

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

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public SellerAddress() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SellerAddress(Long id, String name, String mobile, String locality, String address, String city,
			String state, String pincode) {
		super();
		this.id = id;
		this.name = name;
		this.mobile = mobile;
		this.locality = locality;
		this.address = address;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
	}
    
    

    // getters/setters
}