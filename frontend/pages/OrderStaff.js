import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../config/api';
import css from '../component/css';
import PrimaryButton from '../component/PrimaryButton';
import NavBar from '../component/NavBar';

const OrderStaff = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const canteen = useSelector((state) => state.user.canteen);

  const fetchOrders = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS_BY_CANTEEN(canteen));
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders');
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_ORDER_STATUS(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [canteen]);

  const renderOrder = ({ item }) => (
    <View style={css.orderCard}>
      <Text style={css.orderTitle}>Order #{item.id}</Text>
      <Text style={css.customerName}>Token: {item.tokenId}</Text>

      <View style={css.itemList}>
        <Text style={css.orderItemText}>
          • {item.itemName} x{item.quantity}
        </Text>
      </View>

      <Text style={css.totalAmount}>Total: ₹{item.totalAmount?.toFixed(2) || '0.00'}</Text>
      <Text style={css.orderStatus}>Status: {item.status}</Text>

      {item.status === 'Pending' && (
        <PrimaryButton
          label="Mark as Preparing"
          onPress={() => updateStatus(item.id, 'Preparing')}
          style={[css.primaryButton, { backgroundColor: '#102E50' }]}
          textStyle={css.btnText}
        />
      )}

      {item.status === 'Preparing' && (
        <PrimaryButton
          label="Complete Order"
          onPress={() => updateStatus(item.id, 'Completed')}
          style={[css.primaryButton, { backgroundColor: '#102E50' }]}
          textStyle={css.btnText}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={css.pageContainer}>
        <NavBar pageTitle="Orders" />
        <View style={css.pageContent}>
          <Text>Loading orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={css.pageContainer}>
      <NavBar pageTitle="Orders" />
      <View style={css.pageContent}>
        <Text style={[css.header, { color: "#041C4D" }]}>Current Orders</Text>
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