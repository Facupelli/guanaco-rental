import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    getEquipmet: (state) => {
      state.loading = true;
    },
    setEquipment: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
  },
});

export const { getEquipmet, setEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;

export function fetchEquipment(category, order) {
  return async (dispatch) => {
    dispatch(getEquipmet());

    try {
      const response = await fetch(
        `http://localhost:3001/equipment?category=${category}&order=${order}`
      );
      const data = await response.json();

      dispatch(setEquipment(data));
    } catch (e) {
      console.log("fetch equipment error:", e);
    }
  };
}
