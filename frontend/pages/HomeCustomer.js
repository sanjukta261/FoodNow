import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import css from "../component/css";
import OccupationDropdown from "../component/OccupationDropdown";
import HorizontalScroll from "../component/HorizontalScroll";
import BottomSheet from "../component/BottomSheet";
import { setCanteen } from "../slices/userSlices";
import { addToCart } from "../slices/cartSlice";

const HomeCustomer = () => {
  const dispatch = useDispatch();
  const canteen = useSelector((state) => state.user.canteen);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCanteenChange = (newCanteen) => {
    dispatch(setCanteen(newCanteen));
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedItem(null);
  };

const handleAddToCart = (itemWithQuantity) => {
  console.log("✅ Added to cart from Home:", itemWithQuantity); // ← Add this!
  dispatch(addToCart(itemWithQuantity));
};


  return (
    <SafeAreaView style={css.pageContainer}>
      <NavBar pageTitle="Home" />

      <ScrollView style={css.pageContent}>
        <SearchBar placeholder="Search Your Food" />

        <View style={css.currentCanteenDashboard}>
          <Text style={[css.header, { color: "white", marginBottom: 5 }]}>
            Current Canteen:
          </Text>
          <Text style={[css.subHeader, { color: "white" }]}>{canteen}</Text>
        </View>

        <Text style={css.subHeader}>
          Change your canteen in the below options!
        </Text>
        <OccupationDropdown
          style={{ marginBottom: 30 }}
          placeholder="Select your canteen"
          options={[
            { label: "A Block", value: "A Block" },
            { label: "B Block", value: "B Block" },
          ]}
          value={canteen}
          onValueChange={handleCanteenChange}
        />

        <HorizontalScroll onItemPress={handleItemPress} title="Popular Picks" />
        <HorizontalScroll onItemPress={handleItemPress} title="Top of the week" />
      </ScrollView>

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={handleCloseBottomSheet}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
};

export default HomeCustomer;
