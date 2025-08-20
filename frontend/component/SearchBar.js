import React from "react";
import { View, TextInput } from "react-native";
import css from "@component/css";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = ({ placeholder }) => {
  return (
    <View style={css.searchBarContainer}>
      <Ionicons name="search" size={20} color="grey" />
      <TextInput placeholder={placeholder} style={css.searchBar} />
    </View>
  );
};

export default SearchBar;
