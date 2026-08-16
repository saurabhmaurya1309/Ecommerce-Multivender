package com.saurabh.service;

import java.util.Set;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.saurabh.domain.PaymentMethod;
import com.saurabh.model.Order;
import com.saurabh.model.PaymentOrder;
import com.saurabh.model.User;

public interface PaymentService {
	PaymentOrder createOrder(User user,Set<Order>orders,PaymentMethod paymentMethod);
	PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
	PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
	Boolean proceedPaymnetOrder(
	        PaymentOrder paymentOrder,
	        String paymentId,
	        String paymentLinkId,
	        String paymentLinkReferenceId,
	        String paymentLinkStatus,
	        String signature
	) throws Exception;
	PaymentLink createRazorpayPaymentLink(User user,Long amount,Long orderId) throws RazorpayException;
	String createStripepaymentLink(User user,Long amount,Long orderId);

}
