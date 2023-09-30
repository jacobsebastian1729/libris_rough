import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Button, Typography } from '@mui/material';
import './MyBooksList.css';
import animationData from '../../asset/85479-books.json';
import MyBooksItem from './MyBooksItem';
import { fetchBookshelfByUserIdThunk } from '../../redux/thunk/bookShelf';
import MyBooks from '../../pages/MyBooks';

export default function MyBooksList() {
  const loginUser = useSelector((state: RootState) => state.user.loginUser);
  const userBooks = useSelector((state:RootState)=> state.bookShelf.myBooksData)
  console.log(userBooks, 'hallo allemaal')

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBookshelfByUserIdThunk(loginUser?._id as string))
  }, [dispatch, loginUser?._id]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  console.log('why?', userBooks)

  return (
    <div className='mybooks'>
      {loginUser === null || loginUser._id === '' || !loginUser ? (
        <div>
          <p>Please login</p>
        </div>
      ) : (
        <div>
          <div className='mybook-upper'>
            <Typography variant='h4'>
              Here you'll fine a list of the books you've started reading.
            </Typography>
            <div className='mybook-btns'>
              <Link
                to='/books'
                style={{ textDecoration: 'none', marginRight: '2rem' }}
              >
                <Button variant='outlined' color='secondary'>
                  Add more books
                </Button>
              </Link>
              <Link
                to={`/${loginUser._id}/setting`}
                style={{ textDecoration: 'none' }}
              >
                <Button variant='outlined' color='secondary'>
                  My Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className='mybook-bottom'>
            <div>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BookmarkBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary='Started 0' />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SportsScoreIcon />
                  </ListItemIcon>
                  <ListItemText primary='Finished 0' />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary={`All ${userBooks[0]._id === '' ? 0 : userBooks?.length}`} />
                </ListItem>
              </List>
            </div>
            <div className='mybook-list'>
              {userBooks?.length === 0 || userBooks[0]._id === '' && (
                <div style={{ paddingLeft: '5rem', paddingTop: '1rem' }}>
                  <Typography variant='body1'>
                    Your bookshelf is empty.
                  </Typography>
                  <Lottie options={defaultOptions} height={350} width={350} />
                </div>
              ) }
              {userBooks?.length !== 0 && userBooks[0]._id !== '' && userBooks.map((book) => <MyBooksItem book={book}/>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
