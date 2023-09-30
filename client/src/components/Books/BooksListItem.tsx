import React from "react";
import { BookType } from "../../types/type";
import { Typography, Rating } from "@mui/material";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import "./BookListItem.css";
type Prop = {
  bookItem: BookType;
};
export default function BooksListItem({ bookItem }: Prop) {
  const bookList = useSelector((state: RootState) => state.bookItem.Book);
 
  return (
    <div className="book-items">
      <Link to={`/books/${bookItem._id}`}>
        <img
          src={bookItem.thumbnail}
          alt="book"
          height="220px"
          width="180px"
        ></img>
      </Link>
      <Typography className="">{bookItem.title}</Typography>
      <Rating
        name="half-rating-read"
        defaultValue={bookItem.rating}
        size="small"
        precision={0.5}
        readOnly
      />
      <Typography className="" sx={{ mb: 10 }}>
        {bookItem.author}
      </Typography>
      {/* <p>{bookItem.author}</p>
      <p>{bookItem.description}</p>
      <p>{bookItem.genre}</p>
      <p>{bookItem.rating}</p>
      <p>{bookItem.title}</p>
      <img src={bookItem.thumbnail}></img> */}
    </div>
  );
}
