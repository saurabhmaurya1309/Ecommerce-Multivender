package com.saurabh.service.impl;

import java.util.Set;

import org.hibernate.boot.jaxb.internal.JaxpSourceXmlSource;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.saurabh.domain.PaymentOrderStatus;
import com.saurabh.domain.PaymentStatus;
import com.saurabh.model.Order;
import com.saurabh.model.PaymentOrder;
import com.saurabh.model.User;
import com.saurabh.repository.OrderRepository;
import com.saurabh.repository.PaymentOrderRepository;
import com.saurabh.service.PaymentService;

import aj.org.objectweb.asm.commons.TryCatchBlockSorter;

@Service
public class PaymentServiceImpl implements PaymentService{
	private final PaymentOrderRepository paymentOrderRepository;
	private final OrderRepository orderRepository;
	
	private String apiKey ="apiKey";
	private String apiSecret ="apisecret";

	public PaymentServiceImpl(PaymentOrderRepository paymentOrderRepository, OrderRepository orderRepository) {
		super();
		this.paymentOrderRepository = paymentOrderRepository;
		this.orderRepository = orderRepository;
	}

	@Override
	public PaymentOrder createOrder(User user, Set<Order> orders) {
		Long amount =orders.stream().mapToLong(Order::getTotalSellingPrice).sum();
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setAmount(amount);
		paymentOrder.setUser(user);
		paymentOrder.setOrders(orders);
		return paymentOrderRepository.save(paymentOrder);
	}

	@Override
	public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
		
		return paymentOrderRepository.findById(orderId).orElseThrow(()->
		new Exception("payment not found"));
	}

	@Override
	public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception   {
		PaymentOrder paymentOrder=paymentOrderRepository.findBypaymentLinkId(orderId);
		if(paymentOrder==null) {
			throw new Exception("payment order not found with payment link id");
		}
		return paymentOrder;
	}

	@Override
	public Boolean proceedPaymnetOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
		if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
			RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
			Payment payment = razorpay.payments.fetch(paymentLinkId);
			String status = payment.get("status");
			if(status.equals("captured")) {
				Set<Order>orders = paymentOrder.getOrders();
				for(Order order:orders) {
					order.setPaymentStatus(PaymentStatus.COMPLETED);
					orderRepository.save(order);
				}
				paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
				paymentOrderRepository.save(paymentOrder);
				return true;
			}
			paymentOrder.setStatus(PaymentOrderStatus.FAILED);
			paymentOrderRepository.save(paymentOrder);
			return false;
		}
		
		return false;
	}

	@Override
	public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
		amount =amount*100;
		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
			JSONObject paymentLinkRequest =  new JSONObject();
			paymentLinkRequest.put("amount", amount);
			paymentLinkRequest.put("currency", "INR");
			
			JSONObject  customer = new JSONObject();
			
			customer.put("name", user.getFullName());
			customer.put("email", user.getEmail());
			paymentLinkRequest.put("customer", customer);
			
			JSONObject notify =new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);
			
			paymentLinkRequest.put("callback_url","http://localhost:3000/payment-success"+orderId);
			paymentLinkRequest.put("callback_method", "get");
			
			PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);
			
			String paymentLinkUrl =paymentLink.get("short_url");
			String paymentLinkId = paymentLink.get("id");
			
			return paymentLink;
			
			
			
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			throw new RazorpayException(e.getMessage());
			
		}
	}

	@Override
	public String createStripepaymentLink(User user, Long amount, Long orderId) {
		// TODO Auto-generated method stub 11:25
		return null;
	}
	
	

}
