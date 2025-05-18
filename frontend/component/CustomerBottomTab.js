import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeCustomer from '../pages/HomeCustomer';
import MenuCustomer from '../pages/MenuCustomer';
import CartCustomer from '../pages/CartCustomer';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomerBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Menu') iconName = 'restaurant';
          else if (route.name === 'Cart') iconName = 'cart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#102E50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide header if you already have a top NavBar
      })}
    >
      <Tab.Screen name="Home" component={HomeCustomer} />
      <Tab.Screen name="Menu" component={MenuCustomer} />
      <Tab.Screen name="Cart" component={CartCustomer} />
    </Tab.Navigator>
  );
};

export default CustomerBottomTab;
