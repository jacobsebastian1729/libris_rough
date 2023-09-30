import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  userInput: string;
};
const initialState: InitialState = {
  userInput: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;