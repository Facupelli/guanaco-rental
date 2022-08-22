import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const userSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.data = action.payload.user;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
