import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../redux/store"
import { getBookShelfList } from "../../redux/thunk/bookShelf";
import BookShelfItem from "./BookShelfItem";
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import './BookShelf.css'

export default function BookShelvesList() {
  const userInformation = useSelector(
    (state: RootState) => state.user.loginUser
  );
  const userId = userInformation?._id as string;
  const bookShelfList = useSelector((state: RootState) => state.bookShelf.bookShelfList);


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBookShelfList());
  }, [dispatch, userId])

  console.log(bookShelfList, "bookShelfList")
  return (
    <div style={{paddingTop:'2rem'}}>
      <div style={{marginBottom: '2rem', paddingLeft: '5rem'}}>
      <Typography variant='h4'>Check other user's bookshelves and follow you like.</Typography>
      </div>
      <Box className = "shelf_header">
      <Typography  className = "shelf_header_content" variant="h4" sx={{ fontWeight: 700 }} mt={2} pr = {10}>
              BookShelves
        </Typography>
      </Box>
      <Box className = "shelf_content">
      {
        bookShelfList.map((bookshelf) => {
          
            
            return <BookShelfItem key={bookshelf.userId._id} prop ={bookshelf}/>
        })
      }
      </Box>
    </div>
  )
}
