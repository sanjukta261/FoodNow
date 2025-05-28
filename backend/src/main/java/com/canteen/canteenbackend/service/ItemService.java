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

    public List<Item> getAllItemsByCanteen(String canteen) {
        return itemRepository.findByCanteen(canteen);
    }

    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item updateItemQuantity(Long id, int newQuantity) {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent()) {
            Item item = itemOpt.get();
            item.setQuantity(newQuantity);
            return itemRepository.save(item);
        }
        return null;
    }
}
