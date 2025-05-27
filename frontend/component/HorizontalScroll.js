import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import foodItems from "../data/foodItems";
import css from "../component/css";

const HorizontalScroll = ({ onItemPress, title }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[css.header, { color: "#041C4D"}]}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {foodItems.slice(0, 8).map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onItemPress(item)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 15,
              width: 140,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              marginBottom: 10,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: 80,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              resizeMode="cover"
            />

            <View style={{ padding: 8 }}>
              <Text
                style={{
                  fontSize: 12,
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
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "#102E50",
                  textAlign: "center",
                }}
              >
                ${item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalScroll;
