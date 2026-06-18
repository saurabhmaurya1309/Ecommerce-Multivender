package com.saurabh.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.saurabh.domain.VerificationPurpose;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String otp;

    private LocalDateTime expiryTime;

    @Enumerated(EnumType.STRING)
    private VerificationPurpose purpose;

	@Override
	public String toString() {
		return "VerificationCode [id=" + id + ", email=" + email + ", otp=" + otp + ", expiryTime=" + expiryTime
				+ ", purpose=" + purpose + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public LocalDateTime getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(LocalDateTime expiryTime) {
		this.expiryTime = expiryTime;
	}

	public VerificationPurpose getPurpose() {
		return purpose;
	}

	public void setPurpose(VerificationPurpose purpose) {
		this.purpose = purpose;
	}

	public VerificationCode(Long id, String email, String otp, LocalDateTime expiryTime, VerificationPurpose purpose) {
		super();
		this.id = id;
		this.email = email;
		this.otp = otp;
		this.expiryTime = expiryTime;
		this.purpose = purpose;
	}

	public VerificationCode() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	
	
    
	
    
}
