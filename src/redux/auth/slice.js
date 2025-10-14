import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "./operations";

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
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.user = {
          username: null,
          email: null,
        };
      });
  },
});

export default slice.reducer;
