import { Text, View, Image } from "react-native";
import OccupationDropdown from "@component/OccupationDropdown";
import css from "@component/css";
import React, { useState } from "react";
import PrimaryButton from "@component/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
// Redux imports
import { useDispatch } from "react-redux";
import { setCanteen, setRole } from "../slices/userSlices"; // update the path as needed
import MainBottomNavigate from "../component/MainBottomNavigate";

const YourRole = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedCanteen, setSelectedCanteen] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleConfirm = () => {
    if (selectedCanteen && selectedRole) {
      // Save to Redux store
      dispatch(setCanteen(selectedCanteen));
      dispatch(setRole(selectedRole));

      // Navigate without passing parameters
      navigation.replace("MainBottomNavigate");
    } else {
      alert("Please select both Canteen and Role!");
    }
  };

  return (
    <View style={css.yourRoleContainer}>
      <Image
        source={require("../assets/Icon.png")}
        style={css.splashScreenLogo}
      />
      <Text style={css.header}>
        Welcome Foodies!
      </Text>
      <OccupationDropdown
        style={{ marginTop: 80, marginBottom: 30 }}
        placeholder="Select your canteen"
        options={[
          { label: "A Block", value: "A Block" },
          { label: "B Block", value: "B Block" },
        ]}
        value={selectedCanteen}
        onValueChange={(val) => setSelectedCanteen(val)}
      />
      <OccupationDropdown
        style={{ marginBottom: 50 }}
        placeholder="I'm a _________"
        options={[
          { label: "Customer", value: "Customer" },
          { label: "Staff", value: "Staff" },
        ]}
        value={selectedRole}
        onValueChange={(val) => setSelectedRole(val)}
      />
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        <PrimaryButton
          label="Confirm"
          style={[css.primaryButton, { backgroundColor: "#102E50" }]}
          textStyle={[
            css.primaryButtonText,
            { fontSize: 20, fontWeight: "bold" },
          ]}
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
};

export default YourRole;
