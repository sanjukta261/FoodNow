import React from 'react';
import { View, FlatList } from 'react-native';
import Item from './Item'
const data = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: '₹120',
    image: {uri : "https://www.spicebangla.com/wp-content/uploads/2024/03/Chicken-Puff-Pastry-1.jpg"},
    rate: 4.3,
  },
  {
    id: '2',
    name: 'Paneer Roll',
    price: '₹100',
    image: require('../assets/Item.jpeg'),
    rate: 4.5,

  },
  {
    id: '3',
    name: 'Veg Sandwich',
    price: '₹80',
    image: require('../assets/Item.jpeg'),
    rate: 4.0,

  },
];

const HorizontalScroll = () => {
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
          rate={item.rate}
        />
      )}
    />
  );
};

export default HorizontalScroll;
