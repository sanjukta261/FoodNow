import React from 'react';
import { View, FlatList } from 'react-native';
import Item from './Item'
const data = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: '₹120',
    image: require('../assets/Item.jpeg'), // you’ll update this
  },
  {
    id: '2',
    name: 'Paneer Roll',
    price: '₹100',
    image: require('../assets/Item.jpeg'),
  },
  {
    id: '3',
    name: 'Veg Sandwich',
    price: '₹80',
    image: require('../assets/Item.jpeg'),
  },
];

const HorizontalSroll = () => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Item
          image={item.image}
          name={item.name}
          price={item.price}
        />
      )}
    />
  );
};

export default HorizontalSroll;
