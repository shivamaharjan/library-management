import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  selectedBook: {},
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.bookList = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

const { actions, reducer } = bookSlice;
export const { setBooks, setSelectedBook } = actions;
export default reducer;
