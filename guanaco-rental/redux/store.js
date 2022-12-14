import { configureStore } from "@reduxjs/toolkit";
import equipmentReducer from "../redux/features/equipment/equipmentSlice";
import pickupDateReducer from "../redux/features/pickupDate/pickupDateSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import userReducer from "../redux/features/user/userSlice";
import locationReducer from "../redux/features/location/locationSlice";
import ordersReducer from "../redux/features/orders/ordersSlice";

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    date: pickupDateReducer,
    cart: cartReducer,
    user: userReducer,
    location: locationReducer,
    orders: ordersReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
