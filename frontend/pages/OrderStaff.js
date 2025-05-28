import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import css from '../component/css';
import PrimaryButton from '../component/PrimaryButton';
import NavBar from '../component/NavBar';

const OrderStaff = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders');
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders');
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the order in local state
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
        Alert.alert('Success', `Order status updated to ${newStatus}!`);
      } else {
        Alert.alert('Error', 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  // Refresh orders
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={css.orderCard}>
      <Text style={css.orderTitle}>Order #{item.id}</Text>
      <Text style={css.customerName}>Token: {item.tokenId}</Text>

      <View style={css.itemList}>
        {item.items && item.items.map((food, idx) => (
          <Text key={idx} style={css.orderItemText}>
            • {food.name} x{food.quantity}
          </Text>
        ))}
      </View>

      <Text style={css.totalAmount}>Total: ₹{item.totalAmount?.toFixed(2) || '0.00'}</Text>
      <Text style={css.orderStatus}>Status: {item.status}</Text>

      {item.status === 'Pending' && (
        <PrimaryButton
          label="Mark as Preparing"
          onPress={() => updateStatus(item.id, 'Preparing')}
          style={css.primaryBtn}
          textStyle={css.btnText}
        />
      )}

      {item.status === 'Preparing' && (
        <PrimaryButton
          label="Complete Order"
          onPress={() => updateStatus(item.id, 'Completed')}
          style={css.primaryBtn}
          textStyle={css.btnText}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={css.pageContainer}>
        <NavBar pageTitle="Customer Orders" />
        <View style={css.pageContent}>
          <Text style={css.loadingText}>Loading orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={css.pageContainer}>
      <NavBar pageTitle="Customer Orders" />
      <View style={css.pageContent}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={css.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default OrderStaff;
