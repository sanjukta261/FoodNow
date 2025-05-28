// config/api.js
// API Configuration for your React Native app

// For Android Emulator, use 10.0.2.2 instead of localhost
// For iOS Simulator, use localhost or your machine's IP
// For physical device, use your machine's IP address

export const API_CONFIG = {
  // Change this based on your setup
  BASE_URL: 'http://10.0.2.2:8080/api', // Android Emulator
  // BASE_URL: 'http://localhost:8080/api', // iOS Simulator
  // BASE_URL: 'http://192.168.1.100:8080/api', // Physical Device (replace with your IP)
};

export const API_ENDPOINTS = {
  // Order endpoints
  ORDERS: `${API_CONFIG.BASE_URL}/orders`,
  ORDERS_BY_CANTEEN: (canteenName) => `${API_CONFIG.BASE_URL}/orders/canteen/${canteenName}`,
  UPDATE_ORDER_STATUS: (orderId) => `${API_CONFIG.BASE_URL}/orders/${orderId}/status`,
  ORDER_BY_TOKEN: (token) => `${API_CONFIG.BASE_URL}/orders/token/${token}`,
  
  // Item endpoints
  ITEMS_BY_CANTEEN: (canteenName) => `${API_CONFIG.BASE_URL}/items/canteen/${canteenName}`,
  ADD_ITEM: `${API_CONFIG.BASE_URL}/items`,
  UPDATE_ITEM_QUANTITY: (itemId) => `${API_CONFIG.BASE_URL}/items/${itemId}/quantity`,
};