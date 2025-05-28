import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../config/api';
import NavBar from '../component/NavBar';
import css from '../component/css';

const HomeStaff = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    inventory: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const canteen = useSelector((state) => state.user.canteen);

  const fetchStats = async () => {
    try {
      // Fetch orders for the canteen
      const ordersResponse = await fetch(API_ENDPOINTS.ORDERS_BY_CANTEEN(canteen));
      const orders = await ordersResponse.json();
      
      // Fetch inventory for the canteen
      const inventoryResponse = await fetch(API_ENDPOINTS.ITEMS_BY_CANTEEN(canteen));
      const inventory = await inventoryResponse.json();

      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(order => order.status === 'Pending').length,
        inventory: inventory,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, [canteen]);

  return (
    <View style={css.pageContainer}>
      <NavBar pageTitle="Staff Dashboard" />
      <ScrollView 
        style={css.pageContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={[css.header, { color: "#041C4D" }]}>Dashboard</Text>

        <View style={css.currentCanteenDashboard}>
          <Text style={[css.header, { color: "white", marginBottom: 5 }]}>
            {canteen} Canteen
          </Text>
          <Text style={[css.currentCanteenDashboardText, { fontSize: 16 }]}>
            Total Orders Today: {stats.totalOrders}
          </Text>
          <Text style={[css.currentCanteenDashboardText, { fontSize: 16 }]}>
            Pending Orders: {stats.pendingOrders}
          </Text>
        </View>

        <Text style={css.subHeader}>Inventory Status</Text>
        {stats.inventory.map((item) => (
          <View key={item.id} style={styles.inventoryItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>
              Quantity: {item.quantity}
              {item.quantity < 10 && (
                <Text style={styles.lowStock}> (Low Stock)</Text>
              )}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  inventoryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  lowStock: {
    color: '#ff4444',
    fontWeight: '500',
  },
};

export default HomeStaff;