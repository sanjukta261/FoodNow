package com.canteen.canteenbackend.model;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String canteenName;
    private String itemName;
    private int quantity;
    private String tokenId; // QR code can be generated using this
    private String status;
    private Double totalAmount;
    @Column(nullable = false)
    private boolean fulfilled = false; // default to false

    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // Getters and setters for all fields
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }
    
    public String getTokenId() { 
        return tokenId; 
    }
    
    public void setTokenId(String tokenId) { 
        this.tokenId = tokenId; 
    }
    
    public String getCanteenName() { 
        return canteenName; 
    }
    
    public void setCanteenName(String canteenName) { 
        this.canteenName = canteenName; 
    }
    
    public String getItemName() { 
        return itemName; 
    }
    
    public void setItemName(String itemName) { 
        this.itemName = itemName; 
    }
    
    public int getQuantity() { 
        return quantity; 
    }
    
    public void setQuantity(int quantity) { 
        this.quantity = quantity; 
    }
    
    public Double getTotalAmount() { 
        return totalAmount; 
    }
    
    public void setTotalAmount(Double totalAmount) { 
        this.totalAmount = totalAmount; 
    }
    
    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }
    
    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }
}