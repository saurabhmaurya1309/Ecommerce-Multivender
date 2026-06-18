package com.saurabh.request;

import com.saurabh.model.Address;
import com.saurabh.model.BankDetails;
import com.saurabh.model.BusinessDetails;

public class SellerSignupRequest {
	private String sellerName;

    private String email;

    private String password;

    private String otp;

    private String mobile;

    private String GSTIN;

    private Address pickupAddress;

    private BankDetails bankDetails;

    private BusinessDetails businessDetails;

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getGSTIN() {
		return GSTIN;
	}

	public void setGSTIN(String gSTIN) {
		GSTIN = gSTIN;
	}

	public Address getPickupAddress() {
		return pickupAddress;
	}

	public void setPickupAddress(Address pickupAddress) {
		this.pickupAddress = pickupAddress;
	}

	public BankDetails getBankDetails() {
		return bankDetails;
	}

	public void setBankDetails(BankDetails bankDetails) {
		this.bankDetails = bankDetails;
	}

	public BusinessDetails getBusinessDetails() {
		return businessDetails;
	}

	public void setBusinessDetails(BusinessDetails businessDetails) {
		this.businessDetails = businessDetails;
	}

	public SellerSignupRequest(String sellerName, String email, String password, String otp, String mobile,
			String gSTIN, Address pickupAddress, BankDetails bankDetails, BusinessDetails businessDetails) {
		super();
		this.sellerName = sellerName;
		this.email = email;
		this.password = password;
		this.otp = otp;
		this.mobile = mobile;
		GSTIN = gSTIN;
		this.pickupAddress = pickupAddress;
		this.bankDetails = bankDetails;
		this.businessDetails = businessDetails;
	}

	public SellerSignupRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    


}
