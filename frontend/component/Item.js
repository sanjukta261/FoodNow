import React from "react";
import { View, Text, Image } from "react-native";
import css from "@component/css";

const Item = ({ image, name, price, rate }) => {
  return (
    <View style={css.itemContainer}>
      <Image source={image} style={css.itemImage} resizeMode="cover" />
      <Text style={css.itemName}>{name}</Text>

      <View style={css.priceRow}>
        <Text style={css.itemPrice}>{price}</Text>
        <Text style={css.itemRating}>⭐ {rate}</Text>
      </View>
    </View>
  );
};

export default Item;
