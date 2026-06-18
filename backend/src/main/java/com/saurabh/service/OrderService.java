package com.saurabh.service;

import java.util.List;
import java.util.Set;

import com.saurabh.domain.OrderStatus;
import com.saurabh.model.Address;
import com.saurabh.model.Cart;
import com.saurabh.model.Order;
import com.saurabh.model.OrderItem;
import com.saurabh.model.User;

public interface OrderService {

	Set<Order>createOrder(User user,Address shippingAddress,Cart cart);
	Order findOrderById(Long id);
	List<Order>userOrderHistory(Long userId);
	List<Order>sellersOrder(Long sellerId);
	Order updateOrderStatus(Long orderId,OrderStatus orderStatus);
	Order cancelOrder(Long orderId,User user);
	OrderItem getOrderItemById(Long id) throws Exception;
}
