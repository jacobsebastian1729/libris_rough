import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { fetchBookDetail } from '../../redux/thunk/bookDetails';
import { Typography } from '@mui/material';
import { BookType } from '../../types/type';

type Prop = {
  book: {
    _id: string;
    author: string;
    category: string;
    description: string;
    genre: string;
    language: string;
    rating: number;
    thumbnail: string;
    title: string;
  };
};

function MyBooksItem({ book }: Prop) {
  return (
    <div className='mybook-item'>
      <Link to={`/books/${book._id}`}>
        <img src={book.thumbnail} alt={book.title} />
      </Link>

      <Typography variant='body2'>{book.author}</Typography>
      <Typography variant='body2' style={{ fontWeight: 'bold' }}>
        {book.title.slice(0, 17)}
      </Typography>
    </div>
  );
}

export default MyBooksItem;
