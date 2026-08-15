package com.saurabh.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.saurabh.domain.OrderStatus;
import com.saurabh.domain.PaymentStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String orderId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	private Long sellerId;
	
	@ManyToOne
	@JoinColumn(name = "payment_order_id")
	private PaymentOrder paymentOrder;
	
	
	@OneToMany(mappedBy = "order",cascade =CascadeType.ALL,orphanRemoval =true)
	private List<OrderItem>orderItems=new ArrayList<>();
	
	@OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name = "shipping_address_id")
	private OrderAddress shippingAddress;
	
	@Embedded
	private PaymentDetails paymentDetails = new PaymentDetails();
	
	private double totalMrpPrice;
	
	private Integer totalSellingPrice;
	
	private Integer discount;
	
	private OrderStatus orderStatus;
	
	private int totalItem;
	
	private PaymentStatus paymentStatus = PaymentStatus.PENDING;
	
	private LocalDateTime orderDate = LocalDateTime.now();
	
	private LocalDateTime deliverDate  = orderDate.plusDays(7);

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public PaymentOrder getPaymentOrder() {
		return paymentOrder;
	}

	public void setPaymentOrder(PaymentOrder paymentOrder) {
		this.paymentOrder = paymentOrder;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public OrderAddress getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(OrderAddress shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public PaymentDetails getPaymentDetails() {
		return paymentDetails;
	}

	public void setPaymentDetails(PaymentDetails paymentDetails) {
		this.paymentDetails = paymentDetails;
	}

	public double getTotalMrpPrice() {
		return totalMrpPrice;
	}

	public void setTotalMrpPrice(double totalMrpPrice) {
		this.totalMrpPrice = totalMrpPrice;
	}

	public Integer getTotalSellingPrice() {
		return totalSellingPrice;
	}

	public void setTotalSellingPrice(Integer totalSellingPrice) {
		this.totalSellingPrice = totalSellingPrice;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public int getTotalItem() {
		return totalItem;
	}

	public void setTotalItem(int totalItem) {
		this.totalItem = totalItem;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public LocalDateTime getDeliverDate() {
		return deliverDate;
	}

	public void setDeliverDate(LocalDateTime deliverDate) {
		this.deliverDate = deliverDate;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(Long id, String orderId, User user, Long sellerId, PaymentOrder paymentOrder,
			List<OrderItem> orderItems, OrderAddress shippingAddress, PaymentDetails paymentDetails,
			double totalMrpPrice, Integer totalSellingPrice, Integer discount, OrderStatus orderStatus, int totalItem,
			PaymentStatus paymentStatus, LocalDateTime orderDate, LocalDateTime deliverDate) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.user = user;
		this.sellerId = sellerId;
		this.paymentOrder = paymentOrder;
		this.orderItems = orderItems;
		this.shippingAddress = shippingAddress;
		this.paymentDetails = paymentDetails;
		this.totalMrpPrice = totalMrpPrice;
		this.totalSellingPrice = totalSellingPrice;
		this.discount = discount;
		this.orderStatus = orderStatus;
		this.totalItem = totalItem;
		this.paymentStatus = paymentStatus;
		this.orderDate = orderDate;
		this.deliverDate = deliverDate;
	}

	

	

	
	
	
	
	
}
