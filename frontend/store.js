import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
