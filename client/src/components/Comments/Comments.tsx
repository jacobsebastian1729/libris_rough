import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

import fetchProductComment from '../../redux/thunk/comment';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import CommentItem from './CommentItem';
import {  BookType } from '../../types/type';
import { getUserByLogInUserId } from '../../redux/thunk/user';

type ProductDetails = {
  prop: BookType;
  userId: string;
};

export default function ProductComment({ prop, userId }: ProductDetails) {
  const productComments = useSelector(
    (state: RootState) => state.commentList.productCommentList
  );

  const userInfo = useSelector((state: RootState) => state.user.loginUser);

  const dispatch = useDispatch<AppDispatch>();

  const commentIdUrl = `http://localhost:8000/comments/parentcomments/${prop._id}`;

  useEffect(() => {
    dispatch(fetchProductComment(commentIdUrl));
  }, [dispatch, commentIdUrl]);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  

  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    if (userToken === null || userToken.length === 0) {
      setIsLogin(false);
    } else {
      
      setIsLogin(true);
    }
  }, []);

  

  //
  const [value, setValue] = useState('');
  
  function handleCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (isLogin) {
      const newValue = event.currentTarget.value;
      setValue(newValue);
      dispatch(getUserByLogInUserId(userId));
    } else {
      setLoginMessage(true);
    }
  }
  useEffect(() => {
    dispatch(getUserByLogInUserId(userId));
  }, [])

  //
  const productIdUrl = `http://localhost:8000/comments/${userInfo?._id}`;

  function postComment() {
    if (value !== '') {
      axios
        .post(productIdUrl, {
          comment: value,
          productId: prop._id,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }
  //
  const [loginMessage, setLoginMessage] = useState(false);

  const loginhandleClose = () => {
    setLoginMessage(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: 'white', paddingLeft: 36 }}>
        <Typography variant='h5' gutterBottom sx={{ backgroundColor: 'white' }}>
          Comments
        </Typography>

        <Grid container spacing={0} p={0}>
          <Grid
            item
            xs={8}
            style={{ color: 'white', backgroundColor: '#fafafa' }}
            display='flex'
          >
            <Avatar sx={{ bgcolor: deepOrange[500], mt: 0.8, mr: 2, ml: 0.8 }}>
              OP
            </Avatar>
            <TextField
              id='filled-basic'
              label='Add a comment...'
              variant='filled'
              onChange={handleCommentChange}
              style={{ width: '80%' }}
            />

            <IconButton
              size='large'
              aria-label='show 4 new mails'
              sx={{ color: 'white', backgroundColor: 'pink', m: 0.5 }}
              onClick={postComment}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box paddingLeft={36}>
        {productComments.map((comment) => {
          return <CommentItem key={comment._id} prop={comment} />;
        })}
      </Box>
      <Dialog
        open={loginMessage}
        onClose={loginhandleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Please Login'}</DialogTitle>
      </Dialog>
    </div>
  );
}
