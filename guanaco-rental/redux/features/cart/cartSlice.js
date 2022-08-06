import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addQuantity: (state, action) => {
      console.log(action.payload);
      const item = state.items.filter((item) => action.payload.id === item.id);
      const newItem = { ...item, quantity: action.payload.quantity };
      const newState = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...newState, newItem];
    },
  },
});

export const { addToCart, removeFromCart, addQuantity } = cartSlice.actions;

export default cartSlice.reducer;
