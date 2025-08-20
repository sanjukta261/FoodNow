import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomerBottomTab from './CustomerBottomTab';
import StaffBottomTab from './StaffBottomTab';

const MainBottomNavigate = () => {
  const role = useSelector((state) => state.user.role);
  console.log("Current role in MainBottomNavigate:", role);
  
  // Check if role is empty or not set
  if (!role || role === '') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading role information...</Text>
      </View>
    );
  }
  
  if (role === 'Customer') {
    return <CustomerBottomTab />;
  } else if (role === 'Staff') {
    return <StaffBottomTab />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Unknown role: {role}</Text>
      </View>
    );
  }
};

export default MainBottomNavigate;