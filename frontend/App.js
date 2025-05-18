import { Text } from "react-native";
import SplashScreen from "@pages/SplashScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YourRole from '@pages/YourRole';
import HomeCustomer from "./pages/HomeCustomer";
import HomeStaff from "./pages/HomeStaff";

// Redux imports
import { Provider } from 'react-redux';
import store from './store'; // make sure the path is correct
import MainBottomNavigate from "./component/MainBottomNavigate";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="YourRole" component={YourRole} />
          <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
          <Stack.Screen name="HomeStaff" component={HomeStaff} />
          <Stack.Screen name="MainBottomNavigate" component={MainBottomNavigate} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
