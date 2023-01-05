import { compose, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, { ...action.payload, quantity: 1 }];
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
        } else {
          return item;
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
        } else {
          return item;
        }
      });
      state.items = newState;
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    cleanCart: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addQuantity,
  substractQuantity,
  cleanCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
