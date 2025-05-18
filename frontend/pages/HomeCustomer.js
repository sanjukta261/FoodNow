import { View, Text, ScrollView, SafeAreaView } from "react-native";
import SearchBar from "../component/SearchBar";
import NavBar from "../component/NavBar";
import css from "../component/css";
import OccupationDropdown from "../component/OccupationDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setCanteen } from "../slices/userSlices";
import HorizontalScroll from "../component/HorizontalScroll";
import CustomerBottomTab from '../component/CustomerBottomTab';
import StaffBottomTab from '../component/StaffBottomTab';
import MainNavigator from "../component/MainBottomNavigate";


const HomeCustomer = () => {
  const dispatch = useDispatch();

  const canteen = useSelector((state) => state.user.canteen);
  const role = useSelector((state) => state.user.role);

  const handleCanteenChange = (newCanteen) => {
    dispatch(setCanteen(newCanteen));
  };

  return (
    <SafeAreaView style={css.homeCustomerContainer}>
      <NavBar pageTitle="Home" />

      <ScrollView style={css.homeCustomerContent}>
        <SearchBar placeholder="Search Your Food" />

        <View style={css.currentCanteenDashboard}>
          <Text style={[css.header, { color: "white", marginBottom: 5 }]}>
            Current Canteen:
          </Text>
          <Text style={[css.subHeading, { color: "white" }]}>{canteen}</Text>
        </View>

        <Text style={css.subHeading}>
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

        <Text style={css.subHeading}>Top of the Week</Text>
        <HorizontalScroll />

        <Text style={css.subHeading}>Latest Offer</Text>
        <HorizontalScroll />
        <MainNavigator /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCustomer;
