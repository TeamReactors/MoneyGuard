import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./operations";

export const slice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
  },
});

export default slice.reducer;
