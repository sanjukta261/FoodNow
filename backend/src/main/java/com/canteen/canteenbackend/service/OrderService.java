package com.canteen.canteenbackend.service;

import com.canteen.canteenbackend.model.Order;
import com.canteen.canteenbackend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    // Place order with token generation
    public Order placeOrder(Order order) {
        // Generate unique token
        order.setTokenId(generateToken());
        order.setStatus("Pending");
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
    
    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    // Get orders by canteen
    public List<Order> getOrdersByCanteen(String canteenName) {
        return orderRepository.findByCanteenName(canteenName);
    }
    
    // Get pending orders by canteen
    public List<Order> getPendingOrders(String canteenName) {
        return orderRepository.findPendingOrdersByCanteen(canteenName);
    }
    
    // Update order status
    public Order updateOrderStatus(Long orderId, String newStatus) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);
            return orderRepository.save(order);
        }
        return null;
    }
    
    // Get order by token
    public Order getOrderByToken(String token) {
        return orderRepository.findByTokenId(token);
    }
    
    // Mark order as fulfilled (for backward compatibility)
    public void markAsFulfilled(Long orderId) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus("Completed");
            orderRepository.save(order);
        }
    }
    
    // Generate unique token
    private String generateToken() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}