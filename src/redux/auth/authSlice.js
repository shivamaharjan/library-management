import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUserInfo } = actions;
export default reducer;
