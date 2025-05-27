import { View, Text } from "react-native";
import css from '../component/css'

const CartCustomer = () => {
  return (
    <View style={css.navBar}>
      <Text style={css.navBarTitle}> My Cart </Text>
    </View>
  );
};

export default CartCustomer;
