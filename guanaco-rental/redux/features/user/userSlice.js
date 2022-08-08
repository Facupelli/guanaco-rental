import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const userSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
