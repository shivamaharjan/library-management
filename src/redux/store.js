import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookReducer from "./book/bookSlice";
import studentReducer from "./students/studentSlice";

import borrowHistoryReducer from "./borrowHistory/borrowHistorySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    borrowHistory: borrowHistoryReducer,
    students: studentReducer,
  },
});
