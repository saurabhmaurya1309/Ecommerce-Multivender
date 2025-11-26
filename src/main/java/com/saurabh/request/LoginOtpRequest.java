package com.saurabh.request;

import com.saurabh.domain.USER_ROLE;

public class LoginOtpRequest {
	private String email;
	private String otpS;
	private USER_ROLE role;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtpS() {
		return otpS;
	}
	public void setOtpS(String otpS) {
		this.otpS = otpS;
	}
	public USER_ROLE getRole() {
		return role;
	}
	public void setRole(USER_ROLE role) {
		this.role = role;
	}
	

}
