import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../getCookie";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      deleteCookie("uid");
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
