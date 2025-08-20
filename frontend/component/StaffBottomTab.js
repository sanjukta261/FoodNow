import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStaff from "../pages/HomeStaff";
import OrderStaff from "../pages/OrderStaff";
import AddItemStaff from '../pages/AddItemStaff';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const StaffBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Orders") iconName = "clipboard";
          else if (route.name === "Add-Item") iconName = "add-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#102E50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStaff} />
      <Tab.Screen name="Orders" component={OrderStaff} />
      <Tab.Screen name="Add-Item" component={AddItemStaff} />
    </Tab.Navigator>
  );
};

export default StaffBottomTab;
