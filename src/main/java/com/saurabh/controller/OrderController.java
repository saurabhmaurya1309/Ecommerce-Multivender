package com.saurabh.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.PaymentLink;
import com.saurabh.domain.PaymentMethod;
import com.saurabh.model.Address;
import com.saurabh.model.Cart;
import com.saurabh.model.Order;
import com.saurabh.model.OrderItem;
import com.saurabh.model.PaymentOrder;
import com.saurabh.model.Seller;
import com.saurabh.model.SellerReport;
import com.saurabh.model.User;
import com.saurabh.repository.PaymentOrderRepository;
import com.saurabh.response.PaymentLinkResponse;
import com.saurabh.service.CartService;
import com.saurabh.service.OrderService;
import com.saurabh.service.PaymentService;
import com.saurabh.service.SellerReportService;
import com.saurabh.service.SellerService;
import com.saurabh.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	private final OrderService orderService;
	private final UserService userService;
	private final CartService cartService;
	private final SellerService sellerService;
	private final SellerReportService sellerReportService;
	private final PaymentService paymentService;
	private final PaymentOrderRepository paymentOrderRepository;

	public OrderController(OrderService orderService, UserService userService, CartService cartService, SellerService sellerService, SellerReportService sellerReportService, PaymentService paymentService, PaymentOrderRepository paymentOrderRepository) {
		super();
		this.orderService = orderService;
		this.userService = userService;
		this.cartService = cartService;
		this.sellerService = sellerService;
		this.sellerReportService = sellerReportService;
		this.paymentService = paymentService;
		this.paymentOrderRepository = paymentOrderRepository;
	}

	@PostMapping()
	public ResponseEntity<PaymentLinkResponse>createOrderhandler(
			@RequestBody Address shippingAddress,
			@RequestParam PaymentMethod paymentMethod,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		Cart cart=cartService.finduserCart(user);
		Set<Order> orders=orderService.createOrder(user, shippingAddress, cart);
		PaymentOrder paymentOrder=paymentService.createOrder(user, orders);
		
		PaymentLinkResponse res= new PaymentLinkResponse();
		if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			PaymentLink payment=paymentService.createRazorpayPaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());
			String paymentUrl=payment.get("short_url");
			String paymentUrlId=payment.get("id");
			res.setPayment_link_url(paymentUrl);
			paymentOrder.setPaymentLinkId(paymentUrlId);
			paymentOrderRepository.save(paymentOrder);
			
		}
		else {
			String paymentUrl = paymentService.createStripepaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());
			res.setPayment_link_url(paymentUrl);
			
		}
		
		return new ResponseEntity<>(res,HttpStatus.OK);
		
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>>userOrderHistoryHandler(@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		List<Order>orders=orderService.userOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order>getOrderById(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		Order orders=orderService.findOrderById(orderId);
		
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("item/{orderItemId}")
	public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,@RequestHeader("Authorization") String jwt) throws Exception {
		User user=userService.findUserByJwtToken(jwt);
		OrderItem orderItem=orderService.getOrderItemById(orderItemId);
		return new ResponseEntity<>(orderItem,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order>cancelOrder(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
			) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		Order order=orderService.cancelOrder(orderId, user);
		
		Seller seller =sellerService.getSellerById(order.getSellerId());
		SellerReport report = sellerReportService.getSellerReport(seller);
		
		report.setCanceledOrders(report.getCanceledOrders()+1);
		report.setTotalRefunds(report.getTotalRefunds()+order.getTotalSellingPrice());
		sellerReportService.updateSellerReport(report);
		
		return ResponseEntity.ok(order);
	}
	

}
