import { View, Text, ScrollView, SafeAreaView } from "react-native";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import css from "../component/css";
import OccupationDropdown from "../component/OccupationDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setCanteen } from "../slices/userSlices";
import HorizontalScroll from "../component/HorizontalScroll";

const HomeCustomer = () => {
  const dispatch = useDispatch();

  const canteen = useSelector((state) => state.user.canteen);
  
  const handleCanteenChange = (newCanteen) => {
    dispatch(setCanteen(newCanteen));
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

        <Text style={css.subHeader}>Top of the Week</Text>
        <HorizontalScroll />

        <Text style={css.subHeader}>Latest Offer</Text>
        <HorizontalScroll />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCustomer;