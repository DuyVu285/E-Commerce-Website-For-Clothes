import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: "",
    userID: "",
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setLoggedIn, setUsername, setUserID } = authSlice.actions;
export default authSlice.reducer;
