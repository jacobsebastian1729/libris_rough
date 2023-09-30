import { createSlice } from "@reduxjs/toolkit";
import { BookType } from "../../types/type";

type InitialState = {
  Book: BookType[];
  isLoading: boolean;
  bookDetails: BookType;
};
const initialState: InitialState = {
  Book: [],
  isLoading: false,
  bookDetails: {
    title: "",
    thumbnail: "",
    language: "",
    description: "",
    rating: 0,
    genre: "",
    author: "",
    _id: "",
  },
};
const bookSlice = createSlice({
  name: "bookItem",
  initialState,
  reducers: {
    getBookData: (state, action) => {
      state.Book = action.payload;
      state.isLoading = false;
    },
    getBookDataPending: (state, action) => {
      state.isLoading = action.payload;
    },
    getBookDetail: (state, action) => {
      state.bookDetails = action.payload;
    },
  },
});
export const bookActions = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
