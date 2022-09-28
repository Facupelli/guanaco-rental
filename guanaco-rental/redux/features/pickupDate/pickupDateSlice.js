import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date_range: [],
  pickup_hour: "",
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
    setPickupHour: (state, action) => {
      state.pickup_hour = action.payload;
    },
    resetPickupHour: (state, action) => {
      state.pickup_hour = null;
    },
  },
});

export const { setDate, resetDate, setPickupHour, resetPickupHour } =
  pickupDateSlice.actions;

export default pickupDateSlice.reducer;
