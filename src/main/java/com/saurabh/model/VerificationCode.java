package com.saurabh.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class VerificationCode {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String otp;
	
	private String email;
	
	@OneToOne
	private User user;
	
	@OneToOne
	private Seller seller;

	public VerificationCode(Long id, String otp, String email, User user, Seller seller) {
		super();
		this.id = id;
		this.otp = otp;
		this.email = email;
		this.user = user;
		this.seller = seller;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, id, otp, seller, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		VerificationCode other = (VerificationCode) obj;
		return Objects.equals(email, other.email) && Objects.equals(id, other.id) && Objects.equals(otp, other.otp)
				&& Objects.equals(seller, other.seller) && Objects.equals(user, other.user);
	}

	public VerificationCode() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Seller getSeller() {
		return seller;
	}

	public void setSeller(Seller seller) {
		this.seller = seller;
	}
	
	

}
