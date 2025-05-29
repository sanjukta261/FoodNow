import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../slices/cartSlice";
import css from "../component/css";
import PrimaryButton from "../component/PrimaryButton";

const CartCustomer = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [orderToken, setOrderToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const incrementQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const getTotalAmount = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const simulatePayment = () => {
    return new Promise((resolve) => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        resolve(true);
      }, 2000);
    });
  };

  const handleCheckout = async () => {
    try {
      // First simulate payment
      const paymentSuccess = await simulatePayment();
      
      if (!paymentSuccess) {
        Alert.alert('Error', 'Payment failed. Please try again.');
        return;
      }

      const token = generateToken();
      const response = await fetch('http://10.0.2.2:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: parseFloat(getTotalAmount()),
          tokenId: token,
        }),
      });

      if (response.ok) {
        setOrderToken(token);
        setModalVisible(true);
        dispatch(clearCart()); // Clear cart after successful order
      } else {
        Alert.alert('Error', 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };

  const renderItem = ({ item }) => (
    <View style={css.cartItem}>
      <Image
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={css.image}
      />
      <View style={css.details}>
        <Text style={css.name}>{item.name}</Text>
        <Text style={css.description}>{item.description}</Text>
        <Text style={css.price}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={css.quantitySelector}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item)}
            style={css.quantityBtn(item.quantity > 1)}
          >
            <Text style={css.addToCartText}>-</Text>
          </TouchableOpacity>
          <Text style={css.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item)}
            style={css.quantityBtn(true)}
          >
            <Text style={css.addToCartText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={css.pageContainer}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={css.header}>My Cart</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={css.order}>
            Order ({cartItems.length})
          </Text>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={[css.list, { paddingBottom: 100 }]}
          />
        </View>

        <View style={[css.footer, { alignItems: "center", paddingBottom: 20 }]}>
          <Text style={css.total}>Total: ₹{getTotalAmount()}</Text>
          <PrimaryButton
            label={isProcessing ? "Processing Payment..." : "Proceed to Checkout"}
            onPress={handleCheckout}
            style={[css.button, isProcessing && { backgroundColor: '#666' }]}
            textStyle={css.buttonText}
            disabled={cartItems.length === 0 || isProcessing}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[css.modalContainer, { 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }]}>
          <View style={[css.modalContent, {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center'
          }]}>
            <Text style={[css.modalTitle, { 
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10
            }]}>Order Placed Successfully!</Text>
            <Text style={[css.modalText, {
              fontSize: 16,
              marginBottom: 20,
              textAlign: 'center'
            }]}>Your order token is:</Text>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#102E50',
              marginBottom: 20
            }}>{orderToken}</Text>
            <Text style={{
              fontSize: 14,
              color: '#666',
              marginBottom: 20,
              textAlign: 'center'
            }}>Show this token at the canteen to collect your order</Text>
            <PrimaryButton
              label="Close"
              onPress={() => setModalVisible(false)}
              style={[css.button, { width: '100%' }]}
              textStyle={css.buttonText}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartCustomer;