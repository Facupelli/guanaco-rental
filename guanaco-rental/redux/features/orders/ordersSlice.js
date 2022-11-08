import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: "booking",
  skip: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    nextPage: (state, action) => {
      state.skip = state.skip + 10;
    },
    previousPage: (state, action) => {
      state.skip = state.skip - 10;
    },
    resetPage: (state, action) => {
      state.skip = 0;
    },
  },
});

export const { setSortBy, nextPage, previousPage, resetPage } =
  ordersSlice.actions;

export default ordersSlice.reducer;
