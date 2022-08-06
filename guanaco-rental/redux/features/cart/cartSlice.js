import { compose, createSlice } from "@reduxjs/toolkit";

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
      const newState = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: (item.quantity ? item.quantity : 1) + 1,
          };
        }
      });
      state.items = newState;
    },
    substractQuantity: (state, action) => {
      const newState = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: (item.quantity ? item.quantity : 1) - 1,
          };
        }
      });
      state.items = newState;
    },
  },
});

export const { addToCart, removeFromCart, addQuantity, substractQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
