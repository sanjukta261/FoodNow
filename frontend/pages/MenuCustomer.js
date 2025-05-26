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

const { width } = Dimensions.get("window");

const categories = ["All", "Featured", "Roll", "Samosa", "Beverages"];

// Enhanced mock data that matches what your backend will provide
const foodItems = [
  {
    id: "1",
    name: "Chicken Pettis",
    description: "Crispy chicken with special spicy sauce",
    price: 25.0,
    category: "Featured",
    image: {uri : "https://www.spicebangla.com/wp-content/uploads/2024/03/Chicken-Puff-Pastry-1.jpg"},
    availability: true,
    rating: 4.5,
    prepTime: "15-20 mins",
    ingredients: ["Chicken", "Special Sauce", "Spices"],
  },
  {
    id: "2",
    name: "Vegetable Roll",
    description: "Fresh vegetables wrapped in crispy roll",
    price: 18.0,
    category: "Roll",
    image: {uri: "https://e033fcc8.delivery.rocketcdn.me/wp-content/uploads/vegetable_kathi_roll.jpg"},
    availability: true,
    rating: 4.2,
    prepTime: "10-15 mins",
    ingredients: ["Mixed Vegetables", "Wrapper", "Mint Chutney"],
  },
  {
    id: "3",
    name: "Chicken Roll",
    description: "Tender chicken pieces with onions and sauce",
    price: 28.0,
    category: "Roll",
    image: {uri: "https://bakewithzoha.com/wp-content/uploads/2024/03/chicken-tikka-paratha-rolls-14-720x960.jpg"},
    availability: true,
    rating: 4.7,
    prepTime: "15-20 mins",
    ingredients: ["Chicken", "Onions", "Special Sauce"],
  },
  {
    id: "4",
    name: "Aloo Samosa",
    description: "Crispy triangular pastry with spiced potato filling",
    price: 12.0,
    category: "Samosa",
    image: {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFPP0wyCOQefudUz7vjo9QtLIXPz9BWoY_g&s"},
    availability: true,
    rating: 4.0,
    prepTime: "5-10 mins",
    ingredients: ["Potato", "Peas", "Spices", "Pastry"],
  },
  {
    id: "5",
    name: "Paneer Samosa",
    description: "Crispy samosa with cottage cheese and spices",
    price: 15.0,
    category: "Samosa",
    image: {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX_05yxIu1hfYzBMc85uP6EzRhb-KtQ3wiPg&s"},
    availability: true,
    rating: 4.3,
    prepTime: "5-10 mins",
    ingredients: ["Paneer", "Spices", "Pastry"],
  },
  {
    id: "6",
    name: "Masala Chai",
    description: "Traditional spiced tea with milk",
    price: 8.0,
    category: "Beverages",
    image: {uri: "data:image/jpeg;base64,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"},
    availability: true,
    rating: 4.6,
    prepTime: "5 mins",
    ingredients: ["Tea", "Milk", "Spices", "Sugar"],
  },
  {
    id: "7",
    name: "Cold Coffee",
    description: "Refreshing iced coffee with cream",
    price: 15.0,
    category: "Beverages",
    image: {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJD5Mz7oHpaeet-H0T3TNvRnSE1W2pwqivSM0xxIljcCACjuVNVAcEE3hFbTC4XPlZKYY&usqp=CAU"},
    availability: false, // Some items unavailable
    rating: 4.4,
    prepTime: "5 mins",
    ingredients: ["Coffee", "Milk", "Ice", "Sugar"],
  },
  {
    id: "8",
    name: "Special Biryani",
    description: "Aromatic biryani wrapped in soft bread",
    price: 35.0,
    category: "Featured",
    image: {uri: "https://static.wixstatic.com/media/c47167_4e575594ceab4c95b6d3ad001890c0c7~mv2.webp/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c47167_4e575594ceab4c95b6d3ad001890c0c7~mv2.webp"},
    availability: true,
    rating: 4.8,
    prepTime: "20-25 mins",
    ingredients: ["Basmati Rice", "Chicken", "Spices", "Bread"],
  },
  {
    id: "9",
    name: "Cold Coffee",
    description: "Refreshing iced coffee with cream",
    price: 15.0,
    category: "Beverages",
    image: "https://via.placeholder.com/200x100/8E44AD/FFFFFF?text=Cold+Coffee",
    availability: false, // Some items unavailable
    rating: 4.4,
    prepTime: "5 mins",
    ingredients: ["Coffee", "Milk", "Ice", "Sugar"],
  },
  {
    id: "10",
    name: "Special Biryani Roll",
    description: "Aromatic biryani wrapped in soft bread",
    price: 35.0,
    category: "Featured",
    image:
      "https://via.placeholder.com/200x100/E74C3C/FFFFFF?text=Biryani+Roll",
    availability: true,
    rating: 4.8,
    prepTime: "20-25 mins",
    ingredients: ["Basmati Rice", "Chicken", "Spices", "Bread"],
  },
];

const MenuCustomer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on category and search
  const getFilteredItems = () => {
    let filtered =
      selectedCategory === "All"
        ? foodItems
        : foodItems.filter((item) => item.category === selectedCategory);

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
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
      onPress={() => {
        // Navigate to item details or add to cart
        console.log("Item pressed:", item.name);
      }}
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
            ${item.price.toFixed(2)}
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
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
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
    </SafeAreaView>
  );
};

export default MenuCustomer;
