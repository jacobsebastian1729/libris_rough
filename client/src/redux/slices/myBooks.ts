import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookType } from "../../types/type";

type InitialState = {
    myBooks: BookType[];
};

const initialState: InitialState = {
    myBooks: [],
};

const myBooksSlice = createSlice({
    name: "myBooks",
    initialState,
    reducers: {
        addMyBooks: (state, action: PayloadAction<BookType>) => {
            state.myBooks.push(action.payload);
            // localStorage.setItem("myBooks", JSON.stringify(state.myBooks));
        },
        removeMyBooks: (state, action) => {
            let currentLocalStorage: BookType[] = JSON.parse(localStorage.getItem("myBooks") || "null");
            state.myBooks = [...currentLocalStorage];

            const result = state.myBooks.findIndex(
                (Book) => Book._id === action.payload
            );
            if (result !== -1) {
                state.myBooks.splice(result, 1);
                // localStorage.setItem("myBooks", JSON.stringify(state.myBooks));
            }
        },
    },
});

export const myBooksActions = myBooksSlice.actions;
const reducer = myBooksSlice.reducer;
export default reducer;