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
  },
});

export const { setEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;
