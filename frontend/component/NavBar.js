import React from 'react';
import { View, SafeAreaView, Image, Text } from 'react-native'; // you forgot to import Text!
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import css from '@component/css';

const NavBar = ({pageTitle}) => {
  return (
    <View style={css.navBar}>
      <Image source={require('../assets/Icon.png')} style={css.logo} />
      <Text style={css.navBarTitle}> {pageTitle} </Text>
      <MaterialIcons name="notifications" size={24} color="gray" style={css.icon} />
      <Ionicons name="menu" size={24} color="gray" style={css.icon} />
    </View>
  );
};

export default NavBar;
