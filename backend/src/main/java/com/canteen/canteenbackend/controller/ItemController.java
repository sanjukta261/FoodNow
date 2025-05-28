package com.canteen.canteenbackend.controller;

import com.canteen.canteenbackend.model.Item;
import com.canteen.canteenbackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/canteen/{canteen}")
    public List<Item> getItemsByCanteen(@PathVariable String canteen) {
        return itemService.getAllItemsByCanteen(canteen);
    }

    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @PutMapping("/{id}/quantity")
    public Item updateItemQuantity(@PathVariable Long id, @RequestParam int quantity) {
        return itemService.updateItemQuantity(id, quantity);
    }
}
