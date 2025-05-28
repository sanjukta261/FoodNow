package com.canteen.canteenbackend.service;

import com.canteen.canteenbackend.model.Item;
import com.canteen.canteenbackend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getAllItemsByCanteen(String canteen) {
        return itemRepository.findByCanteen(canteen);
    }

    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item updateItem(Long id, Item itemDetails) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            Item existingItem = item.get();
            existingItem.setName(itemDetails.getName());
            existingItem.setDescription(itemDetails.getDescription());
            existingItem.setPrice(itemDetails.getPrice());
            existingItem.setQuantity(itemDetails.getQuantity());
            existingItem.setCanteen(itemDetails.getCanteen());
            existingItem.setCategory(itemDetails.getCategory());
            existingItem.setAvailability(itemDetails.getAvailability());
            existingItem.setRating(itemDetails.getRating());
            existingItem.setPrepTime(itemDetails.getPrepTime());
            existingItem.setImage(itemDetails.getImage());
            return itemRepository.save(existingItem);
        }
        return null;
    }

    public Item updateItemQuantity(Long id, Integer newQuantity) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            Item existingItem = item.get();
            existingItem.setQuantity(newQuantity);
            existingItem.setAvailability(newQuantity > 0);
            return itemRepository.save(existingItem);
        }
        return null;
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}