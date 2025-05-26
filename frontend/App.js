
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';

// Screens
import SplashScreen from "@pages/SplashScreen";
import YourRole from '@pages/YourRole';
import MainBottomNavigate from "./component/MainBottomNavigate";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="YourRole" component={YourRole} />
          <Stack.Screen name="MainBottomNavigate" component={MainBottomNavigate} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};