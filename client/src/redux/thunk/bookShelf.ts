import axios from "axios";
import { AppDispatch } from "../store";

import { bookShelfListActions } from "../slices/bookShelf";

const url = "http://localhost:8000/bookshelves/";

export function getBookShelfList() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get(`${url}`);
        const bookShelfData = res.data;
        console.log(bookShelfData, 'change to this. initial state')
        dispatch(bookShelfListActions.getBookShelfList(bookShelfData));

    };
};

export function fetchBookshelfByUserIdThunk(userId:string) {
    return async(dispatch:AppDispatch) => {
      const response = await axios.get(`${url}/${userId}`)
    const data = response.data.bookShelf
    const index = data.findIndex((shelf:any) => shelf.userId._id === userId)
    console.log(index)
    const bookData = data[index].books
    dispatch(bookShelfListActions.setMyBooks(bookData))
    }
  }

export function addBookToBookShelfData(userId:string, bookId:string) {
    return async(dispatch:AppDispatch) => {
        const response = await axios.post(`${url}/${userId}/${bookId}`)
        console.log(response, 'Check the bookshelves')
    }
}