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

export function fetchEquipment(category, order, search) {
  return async (dispatch) => {
    dispatch(getEquipmet());

    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/equipment?category=${category}&order=${order}&search=${search}`
          : `http://localhost:3001/equipment?category=${category}&order=${order}&search=${search}`
      );
      const data = await response.json();

      dispatch(setEquipment(data));
    } catch (e) {
      console.log("fetch equipment error:", e);
    }
  };
}
