import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import NavBar from "../component/NavBar";
import SearchBar from "../component/SearchBar";
import css from "../component/css";
import BottomSheet from "../component/BottomSheet";
import foodItems from '../data/foodItems';
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const { width } = Dimensions.get("window");

const categories = ["All", "Featured", "Roll", "Samosa", "Beverages"];


const MenuCustomer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  // Filter items based on category and search
  const getFilteredItems = () => {
    let filtered = selectedCategory === "All" 
      ? foodItems 
      : foodItems.filter(item => item.category === selectedCategory);

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

    const handleItemPress = (item) => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (itemWithQuantity) => {
  console.log('✅ Added to cart from Menu:', itemWithQuantity);
  dispatch(addToCart(itemWithQuantity)); 
};

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 20,
        width: (width - 60) / 2, // Increased spacing between items
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}
      onPress={() => handleItemPress(item)}
    >
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: 100,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        resizeMode="cover"
        onError={(error) => {
          console.log("Image load error:", error.nativeEvent.error);
        }}
      />

      {/* Availability indicator */}
      {!item.availability && (
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            Out of Stock
          </Text>
        </View>
      )}

      <View style={{ padding: 8 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: "#666",
            textAlign: "center",
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#102E50",
              fontWeight: "bold",
            }}
          >
            ₹{item.price.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#888",
            }}
          >
            ⭐ {item.rating}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 9,
            color: "#888",
            textAlign: "center",
          }}
        >
          {item.prepTime}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={css.pageContainer}>
      <NavBar pageTitle="Menu" />
      <View style={css.pageContent}>
        <Text style={[css.header,{color:"#041C4D"}]}>
          Special For You
        </Text>

        <SearchBar
          placeholder="Search Your Food"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Horizontal Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={css.categoryScrollView}
          contentContainerStyle={css.categoryScrollContent}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={css.categoryButton}
            >
              <Text
                style={[
                  css.categoryText,
                  selectedCategory === cat
                    ? css.categoryTextActive
                    : css.categoryTextInactive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results count */}
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            marginBottom: 10,
          }}
        >
          {getFilteredItems().length} items found
        </Text>

        {/* Food Items Grid */}
        <FlatList
          data={getFilteredItems()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{
            marginHorizontal: -20, // Offset parent padding
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20, // Add padding back
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 0,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#888",
                }}
              >
                No items found
              </Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={handleCloseBottomSheet}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
};

export default MenuCustomer;
