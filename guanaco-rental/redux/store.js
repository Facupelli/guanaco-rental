import { configureStore } from "@reduxjs/toolkit";
import equipmentReducer from "../redux/features/equipment/equipmentSlice";
import pickupDateReducer from "../redux/features/pickupDate/pickupDateSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import userReducer from "../redux/features/user/userSlice";

// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    date: pickupDateReducer,
    cart: cartReducer,
    user: userReducer,
    // posts: postsReducer,
    // comments: commentsReducer
  },
});
