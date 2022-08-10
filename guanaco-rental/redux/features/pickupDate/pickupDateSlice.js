import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date_range: [],
};

export const pickupDateSlice = createSlice({
  name: "date_range",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date_range = action.payload;
    },
    resetDate: (state, action) => {
      state.date_range = [];
    },
  },
});

export const { setDate, resetDate } = pickupDateSlice.actions;

export default pickupDateSlice.reducer;
