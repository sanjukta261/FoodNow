package com.canteen.canteenbackend.repository;

import com.canteen.canteenbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by canteen name
    List<Order> findByCanteenName(String canteenName);
    
    // Find order by tokenId
    Order findByTokenId(String tokenId);
    
    // Find pending orders by canteen
    @Query("SELECT o FROM Order o WHERE o.canteenName = ?1 AND o.status = 'Pending'")
    List<Order> findPendingOrdersByCanteen(String canteenName);
    
    // Find orders by status
    List<Order> findByStatus(String status);
    
    // Find orders by canteen and status
    List<Order> findByCanteenNameAndStatus(String canteenName, String status);
}