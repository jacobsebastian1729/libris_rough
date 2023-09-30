import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { CommentType } from '../../types/type';
import { userActions } from '../../redux/slices/user';
import { getUserByLogInUserId } from '../../redux/thunk/user';

type CommentDetail = {
  prop: CommentType;
};

export default function CommentItem({ prop }: CommentDetail) {
  const [childComments, setChildComments] = useState<CommentType[]>([]);

  const commentIdUrl = `http://localhost:8000/comments/childcomments/${prop._id}`;

  const userInfo = useSelector((state: RootState) => state.user.loginUser);
  const userId = userInfo?._id as string
 
  const [chat, setChat] = useState(false);

  function fetchChildComments() {
    if (!prop._id) {
      console.log('Product ID is not defined.');
      return;
    }
    axios
      .get(commentIdUrl)
      .then((res) => res.data)
      .then((data) => setChildComments(data))
      .catch((error) => console.log(error, 'error'));
  }

  useEffect(() => {
    fetchChildComments();
    dispatch(getUserByLogInUserId(userId))
  }, []);

  useEffect(() => {
    if (childComments.length === 0) {
      setChat(false);
    } else {
      setChat(true);
    }
  }, [childComments]);

  //
  const [showReplyTextField, setShowReplyTextField] = useState(false);
  const [viewChat, setViewChat] = useState(false);

  function replyhandleButtonClick() {
    setShowReplyTextField(!showReplyTextField);
  }

  function viewChathandleButtonClick() {
    setViewChat(!viewChat);
  }
  //

  const userToken = localStorage.getItem('userToken');
  const userIdUrl = `http://localhost:8000/comments/${userInfo?._id}`;

  const [value, setValue] = useState('');

  function handleCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (isLogin) {
      const newValue = event.currentTarget.value;
      setValue(newValue);
    } else {
      setLoginMessage(true);
    }
  }
  const dispatch = useDispatch<AppDispatch>()
  function postComment() {
    if (value !== '') {
      axios
        .post(userIdUrl, {
          comment: value,
          productId: prop.productId,
          parentCommentId: prop._id,
        })
        .then((res) => {
          dispatch(getUserByLogInUserId(userId))
          // window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  //

  function getAvatarColor(): string {
    let sum = 1;
    let str = prop.userId.email;
    for (let i = 0; i < str.length; i++) {
      sum *= str.charCodeAt(i);
    }
    let remainder = sum % 360;
    let h = remainder;
    let s = 0.5;
    let v = 0.7;
    let c = v * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = v - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
    } else if (h >= 120 && h < 180) {
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function componentToHex(c: number): string {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  const bgcolor = getAvatarColor();

  //

  function getDateTime(): string {
    const milliseconds = new Date().getTime() - new Date(prop.date).getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30.44;
    const years = days / 365.25;

    if (seconds < 60) {
      return Math.floor(seconds).toString() + '  seconds ago';
    } else if (minutes < 60) {
      return Math.floor(minutes).toString() + '  minutes ago';
    } else if (hours < 24) {
      return Math.floor(hours).toString() + '  hours ago';
    } else if (days < 7) {
      return Math.floor(days).toString() + '  days ago';
    } else if (days < 30.44) {
      return Math.floor(weeks).toString() + '  weeks ago';
    } else if (days < 365.25) {
      return Math.floor(months).toString() + '  months ago';
    } else {
      return Math.floor(years).toString() + '  years ago';
    }
  }

  let dateTime = getDateTime();

  //
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (userToken === null || userToken.length === 0) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const [loginMessage, setLoginMessage] = useState(false);

  const loginhandleClose = () => {
    setLoginMessage(false);
  };

  //

  return (
    <div
      style={{ paddingLeft: 50, paddingTop: 20, backgroundColor: '#fafafa' }}
    >
      <Grid container spacing={0} p={0}>
        <Grid
          item
          xs={8}
          style={{ color: 'black', backgroundColor: 'white' }}
          display='flex'
        >
          <Avatar sx={{ bgcolor: bgcolor, mt: 0.3, mr: 1, ml: 0.8 }}>
            {prop.userId.email.charAt(0).toUpperCase()}
          </Avatar>
          <Grid>
            <Typography
              variant='body2'
              sx={{ backgroundColor: '#fafafa', color: '#757575' }}
            >
              @{prop.userId.email}{' '}
              <span style={{ marginLeft: 10 }}>{dateTime}</span>
            </Typography>
            <Typography variant='body1' sx={{ backgroundColor: '#fafafa' }}>
              {prop.comment}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0} pl={7}>
        <Grid
          item
          xs={12}
          style={{ color: '#424242', backgroundColor: '#fafafa' }}
        >
          <IconButton
            color='inherit'
            sx={{ m: 0, fontSize: '15px' }}
            onClick={replyhandleButtonClick}
          >
            <ReplyIcon style={{ fontSize: '20px' }} />
            reply
          </IconButton>
          {showReplyTextField && (
            <div>
              <TextField
                label='Add reply'
                variant='filled'
                onChange={handleCommentChange}
                size='small'
                style={{ width: '60%' }}
              />
              <IconButton
                size='small'
                sx={{ color: 'white', backgroundColor: 'pink', m: 1 }}
                onClick={postComment}
              >
                <SendIcon />
              </IconButton>
            </div>
          )}

          {chat ? (
            <span>
              <IconButton
                color='inherit'
                sx={{ m: 0, fontSize: '15px' }}
                onClick={viewChathandleButtonClick}
              >
                {childComments.length}
                <CommentIcon
                  style={{ fontSize: '20px', marginLeft: 2, marginRight: 2 }}
                />
                viewChat{' '}
              </IconButton>
              {viewChat && chat && (
                <div>
                  {childComments.map((comment) => {
                    return <CommentItem key={comment._id} prop={comment} />;
                  })}
                </div>
              )}
            </span>
          ) : (
            ''
          )}
        </Grid>
      </Grid>

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
