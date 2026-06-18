package com.saurabh.request;

import com.saurabh.domain.USER_ROLE;
import com.saurabh.domain.VerificationPurpose;

public class SendOtpRequest {
	private String email;
	private VerificationPurpose purpose;
	private USER_ROLE role;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public VerificationPurpose getPurpose() {
		return purpose;
	}
	public void setPurpose(VerificationPurpose purpose) {
		this.purpose = purpose;
	}
	public USER_ROLE getRole() {
		return role;
	}
	public void setRole(USER_ROLE role) {
		this.role = role;
	}
	
	

}
