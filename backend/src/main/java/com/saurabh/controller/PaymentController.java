package com.saurabh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Order;
import com.saurabh.model.PaymentOrder;
import com.saurabh.model.Seller;
import com.saurabh.model.SellerReport;
import com.saurabh.model.User;
import com.saurabh.response.ApiResponse;
import com.saurabh.response.PaymentLinkResponse;
import com.saurabh.service.OrderService;
import com.saurabh.service.PaymentService;
import com.saurabh.service.SellerReportService;
import com.saurabh.service.SellerService;
import com.saurabh.service.TransactionService;
import com.saurabh.service.UserService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	
	private  final PaymentService paymentService;
	private final UserService userService;
	private final SellerService sellerService;
	private final OrderService orderService;
	private final SellerReportService sellerReportService;
	private final TransactionService transactionService;

	public PaymentController(PaymentService paymentService, UserService userService, SellerService sellerService, SellerReportService sellerReportService, OrderService orderService, TransactionService transactionService) {
		super();
		this.paymentService = paymentService;
		this.userService = userService;
		this.sellerService = sellerService;
		this.orderService = orderService;
		this.sellerReportService = sellerReportService;
		this.transactionService = transactionService;
	}
	
	
	@GetMapping("/{paymentId}")
	public ResponseEntity<ApiResponse> paymentSuccesshandler(@PathVariable String paymentId,
			@RequestParam String paymentLinkId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user=userService.findUserByJwtToken(jwt);
		PaymentLinkResponse paymentLinkResponse;
		PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
		
		boolean paymentSuccess =paymentService.proceedPaymnetOrder(paymentOrder, paymentId, paymentLinkId);
		if(paymentSuccess) {
			for(Order order:paymentOrder.getOrders()) {
				transactionService.createTransaction(order);
				Seller seller =sellerService.getSellerById(order.getSellerId());
				SellerReport report =sellerReportService.getSellerReport(seller);
				report.setTotalOrders(report.getTotalOrders()+1);
				report.setTotalEarnings(report.getTotalEarnings()+order.getTotalSellingPrice());
				report.setTotalSales(report.getTotalSales()+order.getOrderItems().size());
				sellerReportService.updateSellerReport(report);
			}
			
		}
		ApiResponse res = new ApiResponse();
		res.setMessage("Payment successful");
		
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}
	

}
