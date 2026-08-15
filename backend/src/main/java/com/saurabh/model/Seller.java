package com.saurabh.model;

import com.saurabh.domain.AccountStatus;
import com.saurabh.domain.USER_ROLE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Seller {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String sellerName;
	
	private String mobile;
	
	@Column(unique =true,nullable=false)
	private String email;
	
	private String password;
	
	@Embedded
	private BusinessDetails businessDetails= new BusinessDetails();
	
	@Embedded
	private BankDetails bankDetails = new BankDetails(); 
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pickup_address_id")
	private SellerAddress pickupAddress;
	
	private String GSTIN;
	
	private USER_ROLE role=USER_ROLE.ROLE_SELLER;
	
	private boolean emailVerified =false;
	
	private AccountStatus accountStatus = AccountStatus.PENDING_VERIFICATION;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
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

	public BusinessDetails getBusinessDetails() {
		return businessDetails;
	}

	public void setBusinessDetails(BusinessDetails businessDetails) {
		this.businessDetails = businessDetails;
	}

	public BankDetails getBankDetails() {
		return bankDetails;
	}

	public void setBankDetails(BankDetails bankDetails) {
		this.bankDetails = bankDetails;
	}

	public SellerAddress getPickupAddress() {
		return pickupAddress;
	}

	public void setPickupAddress(SellerAddress pickupAddress) {
		this.pickupAddress = pickupAddress;
	}

	public String getGSTIN() {
		return GSTIN;
	}

	public void setGSTIN(String gSTIN) {
		GSTIN = gSTIN;
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

	public AccountStatus getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(AccountStatus accountStatus) {
		this.accountStatus = accountStatus;
	}

	public Seller() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Seller(Long id, String sellerName, String mobile, String email, String password,
			BusinessDetails businessDetails, BankDetails bankDetails, SellerAddress pickupAddress, String gSTIN,
			USER_ROLE role, boolean emailVerified, AccountStatus accountStatus) {
		super();
		this.id = id;
		this.sellerName = sellerName;
		this.mobile = mobile;
		this.email = email;
		this.password = password;
		this.businessDetails = businessDetails;
		this.bankDetails = bankDetails;
		this.pickupAddress = pickupAddress;
		GSTIN = gSTIN;
		this.role = role;
		this.emailVerified = emailVerified;
		this.accountStatus = accountStatus;
	}

	

	

	
	
	
	
	
	
	
	
	

}
