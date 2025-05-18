import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import css from '@component/css';

const Item = ({ image, name, price }) => {
  return (
    <View style={css.itemContainer}>
      <Image
        source={image}
        style={css.itemImage}
        resizeMode="cover"
      />
      <Text style={css.itemName}>{name}</Text>
      <Text style={css.itemPrice}>{price}</Text>
    </View>
  );
};

export default Item;