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
  },
});

export const { setDate } = pickupDateSlice.actions;

export default pickupDateSlice.reducer;
