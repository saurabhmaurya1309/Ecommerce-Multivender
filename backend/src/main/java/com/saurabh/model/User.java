package com.saurabh.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.saurabh.domain.USER_ROLE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	private String email;
	
	private String fullName;
	
	private String mobile;
	
	private USER_ROLE role= USER_ROLE.ROLE_CUSTOMER;
	
	private boolean emailVerified = false;
	
	@OneToMany
	private Set<Address>addresses =new HashSet<>();
	
	@ManyToMany
	@JsonIgnore
	private Set<Coupon>usedCoupons =new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public USER_ROLE getRole() {
		return role;
	}

	public void setRole(USER_ROLE role) {
		this.role = role;
	}

	public boolean isEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(boolean emailVerified) {
		this.emailVerified = emailVerified;
	}

	public Set<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(Set<Address> addresses) {
		this.addresses = addresses;
	}

	public Set<Coupon> getUsedCoupons() {
		return usedCoupons;
	}

	public void setUsedCoupons(Set<Coupon> usedCoupons) {
		this.usedCoupons = usedCoupons;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(Long id, String password, String email, String fullName, String mobile, USER_ROLE role,
			boolean emailVerified, Set<Address> addresses, Set<Coupon> usedCoupons) {
		super();
		this.id = id;
		this.password = password;
		this.email = email;
		this.fullName = fullName;
		this.mobile = mobile;
		this.role = role;
		this.emailVerified = emailVerified;
		this.addresses = addresses;
		this.usedCoupons = usedCoupons;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", password=" + password + ", email=" + email + ", fullName=" + fullName + ", mobile="
				+ mobile + ", role=" + role + ", emailVerified=" + emailVerified + ", addresses=" + addresses
				+ ", usedCoupons=" + usedCoupons + "]";
	}

	
	
	
	

}
