import { createSlice } from "@reduxjs/toolkit";

import { BookShelf } from "../../types/type";
import { UserDataType } from "../../types/type";

type InitialState = {
    bookShelfList: BookShelf[];
    loginUser: UserDataType;
    myBooksData:{ 
    author:string;
    category: string;
    description: string;
    genre: string;
    language: string;
    rating: number;
    thumbnail:string;
    title:string;
    _id: string;
}[],
   
};

const initialState: InitialState = {
    bookShelfList: [
        {
            userId: {
                email: '',
                _id: '',
            },
            books: [{
                _id:'',
                title: "",
                thumbnail: "",
                description: "",
                rating: 0,
                genre: "",
                author: "",
                language: '',
            }]
        },
    ],
    loginUser: {
        _id: '',
        email: '',
        fullName: '',
        profile_img: '',
        about_me: '',
        isAdmin: false,
        status: 'inactive',
        followers: [],
        following: [],
        bookShelves: []
      },
      myBooksData: [{
        author:'',
        category: '',
        description: '',
        genre: '',
        language: '',
        rating: 0,
        thumbnail:'',
        title: '',
        _id: ''
        
      }]  

};

const bookShelfListSlice = createSlice ({
    name: "bookShelfList",
    initialState,
    reducers: {
        getBookShelfList: (state, action) => {
            state.bookShelfList = action.payload;
        },
        setMyBooks: (state,action) => {
            state.myBooksData = action.payload
        }
    },
})

export const bookShelfListActions = bookShelfListSlice.actions;

const bookShelfListReducer = bookShelfListSlice.reducer;

export default bookShelfListReducer;