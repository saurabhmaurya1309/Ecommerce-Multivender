package com.saurabh.service.impl;

import java.util.Set;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import com.saurabh.domain.OrderStatus;
import com.saurabh.domain.PaymentMethod;
import com.saurabh.domain.PaymentOrderStatus;
import com.saurabh.domain.PaymentStatus;
import com.saurabh.model.Order;
import com.saurabh.model.PaymentDetails;
import com.saurabh.model.PaymentOrder;
import com.saurabh.model.User;
import com.saurabh.repository.OrderRepository;
import com.saurabh.repository.PaymentOrderRepository;
import com.saurabh.service.PaymentService;


@Service
public class PaymentServiceImpl implements PaymentService{
	private final PaymentOrderRepository paymentOrderRepository;
	private final OrderRepository orderRepository;
	
	private String apiKey ="rzp_test_TQQpBMyaNM0AaI";
	private String apiSecret ="M72Hd7oDuOFVzZ9bBsJJeYOH";

	public PaymentServiceImpl(PaymentOrderRepository paymentOrderRepository, OrderRepository orderRepository) {
		super();
		this.paymentOrderRepository = paymentOrderRepository;
		this.orderRepository = orderRepository;
	}

	@Override
	public PaymentOrder createOrder(
	        User user,
	        Set<Order> orders,
	        PaymentMethod paymentMethod) {
		System.out.println("paymentMethod=>>"+paymentMethod);

	    Long amount = orders.stream()
	            .mapToLong(
	                order -> order.getTotalSellingPrice()
	            )
	            .sum();

	    PaymentOrder paymentOrder =
	            new PaymentOrder();

	    paymentOrder.setAmount(amount);
	    paymentOrder.setUser(user);
	    paymentOrder.setPaymentMethod(
	            paymentMethod
	    );

	    PaymentOrder savedPaymentOrder =
	            paymentOrderRepository.save(
	                    paymentOrder
	            );

	    for (Order order : orders) {

	        order.setPaymentOrder(
	                savedPaymentOrder
	        );

	        orderRepository.save(order);

	        savedPaymentOrder
	                .getOrders()
	                .add(order);
	    }

	    return savedPaymentOrder;
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
	public Boolean proceedPaymnetOrder(
	        PaymentOrder paymentOrder,
	        String paymentId,
	        String paymentLinkId,
	        String paymentLinkReferenceId,
	        String paymentLinkStatus,
	        String signature
	) throws Exception {

	    // Idempotency:
	    // If payment was already successfully processed,
	    // don't process it again.
	    if (paymentOrder.getStatus()
	            .equals(PaymentOrderStatus.SUCCESS)) {

	        return true;
	    }

	    if (!paymentOrder.getStatus()
	            .equals(PaymentOrderStatus.PENDING)) {

	        return false;
	    }

	    // ============================================
	    // 1. Verify Razorpay Payment Link signature
	    // ============================================

	    JSONObject options = new JSONObject();

	    options.put(
	            "payment_link_id",
	            paymentLinkId
	    );

	    options.put(
	            "payment_link_reference_id",
	            paymentLinkReferenceId
	    );

	    options.put(
	            "payment_link_status",
	            paymentLinkStatus
	    );

	    options.put(
	            "razorpay_payment_id",
	            paymentId
	    );

	    options.put(
	            "razorpay_signature",
	            signature
	    );

	    boolean signatureVerified =
	            Utils.verifyPaymentLink(
	                    options,
	                    apiSecret
	            );

	    if (!signatureVerified) {

	        paymentOrder.setStatus(
	                PaymentOrderStatus.FAILED
	        );

	        paymentOrderRepository.save(
	                paymentOrder
	        );

	        return false;
	    }

	    // ============================================
	    // 2. Fetch actual Razorpay PAYMENT
	    // ============================================

	    RazorpayClient razorpay =
	            new RazorpayClient(
	                    apiKey,
	                    apiSecret
	            );

	    // IMPORTANT:
	    // paymentId = pay_xxxxx
	    // paymentLinkId = plink_xxxxx
	    //
	    // Payment API needs pay_xxxxx
	    Payment payment =
	            razorpay.payments.fetch(
	                    paymentId
	            );

	    String status =
	            payment.get("status");

	    System.out.println(
	            "Razorpay Payment Status = "
	                    + status
	    );

	    // ============================================
	    // 3. Verify payment is captured
	    // ============================================

	    if (!"captured".equals(status)) {

	        paymentOrder.setStatus(
	                PaymentOrderStatus.FAILED
	        );

	        paymentOrderRepository.save(
	                paymentOrder
	        );

	        return false;
	    }

	    // ============================================
	    // 4. Update every seller Order
	    // ============================================

	    Set<Order> orders =
	            paymentOrder.getOrders();

	    for (Order order : orders) {

	        // Main payment status
	    	order.setOrderStatus(
	    	        OrderStatus.PLACED
	    	    );
	        order.setPaymentStatus(
	                PaymentStatus.COMPLETED
	        );

	        // Payment details
	        PaymentDetails paymentDetails =
	                order.getPaymentDetails();

	        paymentDetails.setPaymentId(
	                paymentId
	        );

	        paymentDetails.setRazorpayPaymentLinkId(
	                paymentLinkId
	        );

	        paymentDetails.setRazorpayPaymentLinkReferenceId(
	                paymentLinkReferenceId
	        );

	        paymentDetails.setRazorpayPaymentLinkStatus(
	                paymentLinkStatus
	        );

	        paymentDetails.setStatus(
	                PaymentStatus.COMPLETED
	        );

	        orderRepository.save(order);
	    }

	    // ============================================
	    // 5. Update PaymentOrder
	    // ============================================

	    paymentOrder.setStatus(
	            PaymentOrderStatus.SUCCESS
	    );

	    paymentOrderRepository.save(
	            paymentOrder
	    );

	    System.out.println(
	            "Payment verified successfully"
	    );

	    return true;
	}

	@Override
	public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
		amount =amount*100;
		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
			JSONObject paymentLinkRequest =  new JSONObject();
			paymentLinkRequest.put("amount", amount);
			paymentLinkRequest.put("currency", "INR");
			paymentLinkRequest.put( "reference_id", "PAYMENT-" + orderId);
			
			JSONObject  customer = new JSONObject();
			
			customer.put("name", user.getFullName());
			customer.put("email", user.getEmail());
			paymentLinkRequest.put("customer", customer);
			
			JSONObject notify =new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);
			
			paymentLinkRequest.put("callback_url","http://localhost:3000/payment-success/"+orderId);
			paymentLinkRequest.put("callback_method", "get");
			
			PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);
			
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
