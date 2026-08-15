package com.saurabh.service.impl;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.saurabh.domain.OrderStatus;
import com.saurabh.domain.PaymentStatus;
import com.saurabh.model.Cart;
import com.saurabh.model.CartItem;
import com.saurabh.model.CustomerAddress;
import com.saurabh.model.Order;
import com.saurabh.model.OrderAddress;
import com.saurabh.model.OrderItem;
import com.saurabh.model.User;
import com.saurabh.repository.OrderAddressRepository;
import com.saurabh.repository.OrderItemRepository;
import com.saurabh.repository.OrderRepository;
import com.saurabh.service.OrderService;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
	
	private final OrderRepository orderRepository;
	private final OrderAddressRepository orderAddressRepository;
	private final OrderItemRepository orderItemRepository;
	public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, OrderAddressRepository orderAddressRepository) {
		super();
		this.orderRepository = orderRepository;
		this.orderAddressRepository = orderAddressRepository;
		this.orderItemRepository = orderItemRepository;
	}

	@Transactional
	@Override
	public Set<Order> createOrder(
	        User user,
	        CustomerAddress customerAddress,
	        Cart cart) {

	    Set<Order> orders = new HashSet<>();

	    Map<Long, List<CartItem>> itemsBySeller =
	            cart.getCartItems()
	                .stream()
	                .collect(Collectors.groupingBy(
	                    item -> item.getProduct().getSeller().getId()
	                ));

	    // Create immutable shipping address snapshot
	    OrderAddress orderAddress = new OrderAddress();

	    orderAddress.setName(customerAddress.getName());
	    orderAddress.setMobile(customerAddress.getMobile());
	    orderAddress.setLocality(customerAddress.getLocality());
	    orderAddress.setAddress(customerAddress.getAddress());
	    orderAddress.setCity(customerAddress.getCity());
	    orderAddress.setState(customerAddress.getState());
	    orderAddress.setPincode(customerAddress.getPincode());

	    OrderAddress savedAddress =
	            orderAddressRepository.save(orderAddress);

	    for (Map.Entry<Long, List<CartItem>> entry
	            : itemsBySeller.entrySet()) {

	        Long sellerId = entry.getKey();
	        List<CartItem> items = entry.getValue();

	        int totalOrderPrice = items.stream()
	                .mapToInt(CartItem::getSellingPrice)
	                .sum();

	        int totalItem = items.stream()
	                .mapToInt(CartItem::getQuantity)
	                .sum();

	        Order createdOrder = new Order();

	        createdOrder.setUser(user);
	        createdOrder.setSellerId(sellerId);
	        createdOrder.setTotalItem(totalItem);
	        createdOrder.setTotalSellingPrice(totalOrderPrice);
	        createdOrder.setTotalMrpPrice(totalOrderPrice);

	        // IMPORTANT
	        createdOrder.setShippingAddress(savedAddress);

	        createdOrder.setOrderStatus(OrderStatus.PENDING);
	        createdOrder.getPaymentDetails()
	                .setStatus(PaymentStatus.PENDING);

	        Order savedOrder =
	                orderRepository.save(createdOrder);

	        orders.add(savedOrder);

	        List<OrderItem> orderItems = new ArrayList<>();

	        for (CartItem item : items) {

	            OrderItem orderItem = new OrderItem();

	            orderItem.setOrder(savedOrder);
	            orderItem.setMrpPrice(item.getMrpPrice());
	            orderItem.setProduct(item.getProduct());
	            orderItem.setQuantity(item.getQuantity());
	            orderItem.setSize(item.getSize());
	            orderItem.setUserId(item.getUserId());
	            orderItem.setSellingPrice(item.getSellingPrice());

	            OrderItem savedOrderItem =
	                    orderItemRepository.save(orderItem);

	            savedOrder.getOrderItems().add(savedOrderItem);
	            orderItems.add(savedOrderItem);
	        }
	    }

	    return orders;
	}

	@Override
	public Order findOrderById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Order> userOrderHistory(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Order> sellersOrder(Long sellerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order cancelOrder(Long orderId, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OrderItem getOrderItemById(Long id) throws Exception {
		return orderItemRepository.findById(id).orElseThrow(()->
			new Exception("order item not exist .........")
		);
	}

	
	

}
