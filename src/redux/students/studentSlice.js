import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
  },
});

const { actions, reducer } = studentSlice;
export const { setStudentList } = actions;
export default reducer;
