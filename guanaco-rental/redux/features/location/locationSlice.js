import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: true,
  city: "",
};

export const locationSlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.city = action.payload;
    },
    resetLocation: (state, action) => {
      state.city = "";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setLocation, resetLocation, setShowModal } =
  locationSlice.actions;

export default locationSlice.reducer;
