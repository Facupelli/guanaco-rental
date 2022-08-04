import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    setEquipment: (state, action) => {
      state.products = action.payload;
    },
    filterByDateRange: (state, action) => {
      const dateRange = action.payload;
      // const productsTaken = state.products.filter(
      //   (product) =>
      //     product.bookings.filter((date) => dateRange.indexOf(date) >= 0)
      //       .length === 0
      // );
      // console.log("SLICE", productsTaken)
      // state.products = state.products;
    },
  },
});

export const { setEquipment, filterByDateRange } = equipmentSlice.actions;

export default equipmentSlice.reducer;
