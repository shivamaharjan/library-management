import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    borrowHistoryList: [],
};

export const bookSlice = createSlice({
    name: "borrowHistory",
    initialState,
    reducers: {
        setBorrowHistories: (state, action) => {
            state.borrowHistoryList = action.payload;
        },
    },
});

const { actions, reducer } = bookSlice;
export const { setBorrowHistories } = actions;
export default reducer;
