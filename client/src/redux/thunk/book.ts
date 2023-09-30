import { AppDispatch } from "../store";
import { PORT } from "../../port/Port";
import { bookActions } from "../slices/book";
import axios from "axios";
import { BookType } from "../../types/type";

const url = `http://localhost:${PORT}/books`;
export function fetchbookData() {
  return async (dispatch: AppDispatch) => {
    dispatch(bookActions.getBookDataPending(true));
    const response = await fetch(url);
    const bookData = await response.json();
    dispatch(bookActions.getBookData(bookData));
  };
}

export function createBookThunk(bookData: BookType) {
  return async (dispatch: AppDispatch) => {
    const response = axios.post(`${url}/create`, bookData)
  }
}
