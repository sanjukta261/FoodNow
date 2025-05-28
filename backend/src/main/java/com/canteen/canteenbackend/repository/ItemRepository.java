package com.canteen.canteenbackend.repository;

import com.canteen.canteenbackend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCanteen(String canteen); // ← add this
    Item findByNameAndCanteen(String name, String canteen); // ← for use in order controller
}
