package com.canteen.canteenbackend.controller;

import com.canteen.canteenbackend.model.Order;
import com.canteen.canteenbackend.model.Item;
import com.canteen.canteenbackend.repository.ItemRepository;
import com.canteen.canteenbackend.service.OrderService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;
    private final ItemRepository itemRepository;

    public OrderController(OrderService orderService, ItemRepository itemRepository) {
        this.orderService = orderService;
        this.itemRepository = itemRepository;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // Reduce item quantity
        Item item = itemRepository.findByNameAndCanteen(order.getItemName(), order.getCanteenName());
        if (item != null && item.getQuantity() >= order.getQuantity()) {
            item.setQuantity(item.getQuantity() - order.getQuantity());
            itemRepository.save(item);
        }
        return orderService.placeOrder(order);
    }

    // Get all orders for staff dashboard
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get orders by canteen for specific canteen staff
    @GetMapping("/canteen/{canteenName}")
    public List<Order> getOrders(@PathVariable String canteenName) {
        return orderService.getOrdersByCanteen(canteenName);
    }

    // Get only pending orders for a canteen
    @GetMapping("/canteen/{canteenName}/pending")
    public List<Order> getPendingOrders(@PathVariable String canteenName) {
        return orderService.getPendingOrders(canteenName);
    }

    // Update order status (for staff to change status)
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        Order updatedOrder = orderService.updateOrderStatus(id, newStatus);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        }
        return ResponseEntity.notFound().build();
    }

    // Mark order as fulfilled (existing method for backward compatibility)
    @PutMapping("/{id}/fulfill")
    public void fulfillOrder(@PathVariable Long id) {
        orderService.markAsFulfilled(id);
    }

    // Get order by token (for customer to verify)
    @GetMapping("/token/{token}")
    public ResponseEntity<Order> getOrderByToken(@PathVariable String token) {
        Order order = orderService.getOrderByToken(token);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }
}