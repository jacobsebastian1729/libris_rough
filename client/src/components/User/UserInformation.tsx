import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Avatar, Button, Typography } from '@mui/material';
import { deepPurple, red } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import './UserInformation.css';
import { AppDispatch, RootState } from '../../redux/store';
import { UserDataType } from '../../types/type';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../redux/slices/user';

import { fetchUserFollowing, fetchUserFollowers } from '../../redux/thunk/following';
import { getUserBookByLogInUserId, getUserByLogInUserId } from '../../redux/thunk/user';

const EditSchema = Yup.object().shape({
  fullName: Yup.string().nullable().notRequired(),
  email: Yup.string().email('Invalid email').nullable().notRequired(),
  about_me: Yup.string().nullable().notRequired(),
  profile_img: Yup.string().nullable().notRequired(),
});

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Password should contain uppercase letter, lowercase letter and number'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required('Password confirmation is required'),
});

type Prop = {
  mode: string;
}

export default function UserInformation({mode}:Prop) {
  const [open, setOpen] = React.useState(false);
  const [passwordChangeFormOpen, setPasswordChangeFormOpen] =
    React.useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.loginUser);
  const userId = user?._id as string;
  const userBookshelf = useSelector((state:RootState) => state.user.loginUserBookShelf)
 
  const token = localStorage.getItem('userToken') as string;

  const dispatch = useDispatch<AppDispatch>();

  ////////following/folloers////

  const userFollowingList = useSelector((state: RootState) => state.followList.FollowingList)
  const userFollowersList = useSelector((state: RootState) => state.followList.FollowersList)

  const userFollowingUrl = `http://localhost:8000/following/followings/${userId}`
  const userFollowersUrl = `http://localhost:8000/following/followers/${userId}`

  useEffect(() => {
    dispatch(fetchUserFollowing(userFollowingUrl));
    dispatch(fetchUserFollowers(userFollowersUrl));
  }, [dispatch, userFollowersUrl, userFollowingUrl])

  ////////////

  useEffect(()=>{
    dispatch(getUserBookByLogInUserId(userId))
  },[])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pwOpen = () => {
    setPasswordChangeFormOpen(true);
  };

  const pwClose = () => {
    setPasswordChangeFormOpen(false);
  };

  const editHandler = (
    newInfo: Partial<UserDataType>,
    userId: string | undefined,
    token: string
  ) => {
    const { fullName, email, about_me, profile_img } = newInfo;

    const dataToUpdate: Partial<UserDataType> = {};

    if (fullName !== '') {
      dataToUpdate.fullName = fullName;
    }
    if (email !== '') {
      dataToUpdate.email = email;
    }
    if (about_me !== '') {
      dataToUpdate.about_me = about_me;
    }
    if (profile_img !== '' && profile_img) {
      dataToUpdate.profile_img = profile_img;
    }

    axios
      .put(`http://localhost:8000/user/${userId}`, dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 404) {
          console.log('fail');
        }
        if (res.status === 200) {
          console.log('success');
          dispatch(userActions.getLoginUser(res.data.updateUser));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePassword = (
    value: { password: string; confirmPassword: string },
    userId: string,
    token: string
  ) => {
    const url = `http://localhost:8000/user/password/${userId}`;
    console.log(value);

    axios
      .put(url, value, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 200) {
          console.log('success');
        }
        if (res.status === 401) {
          console.log('bad');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='user-information'>
      <div className='profile' style={{backgroundColor: mode === 'dark' ? '#4e342e' : 'black'}}>
        <h2>{user?.fullName}</h2>

        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {user?.profile_img ? (
              <Avatar
                alt={user?.fullName}
                src={user?.profile_img}
                sx={{
                  width: 150,
                  height: 150,
                  marginLeft: '3rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  zIndex: '1',
                  border: '3px solid white',
                }}
              />
            ) : (
              <Avatar
                alt={user?.fullName}
                sx={{
                  width: 150,
                  height: 150,
                  fontSize: '5rem',
                  bgcolor: deepPurple[500],
                  marginLeft: '3rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  zIndex: '1',
                  border: '3px solid white',
                }}
              >
                {user?.fullName?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Button onClick={handleClickOpen}>
              <EditIcon />
              Edit profile
            </Button>
            <Dialog
              fullWidth={true}
              maxWidth='md'
              open={passwordChangeFormOpen}
              onClose={handleClose}
            >
              {' '}
              <DialogTitle>Password Change</DialogTitle>
              <DialogContent>
                <Formik
                  initialValues={{ password: '', confirmPassword: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    changePassword(values, userId, token);
                  }}
                >
                  {({ errors, touched, handleChange }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                          <TextField
                            required
                            id='password'
                            name='password'
                            label='Password'
                            fullWidth
                            variant='standard'
                            onChange={handleChange}
                          />
                          {errors.password ? (
                            <Typography variant='body2' color={red[600]}>
                              *{errors.password}
                            </Typography>
                          ) : null}
                        </Grid>

                        <Grid item xs={12} sm={5}>
                          <TextField
                            required
                            id='confirmPassword'
                            name='confirmPassword'
                            label='Confirm Password'
                            fullWidth
                            variant='standard'
                            onChange={handleChange}
                          />
                          {errors.confirmPassword ? (
                            <Typography color={red[600]} variant='body2'>
                              *{errors.confirmPassword}
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <Button onClick={pwClose}>Close</Button>
                        <Button type='submit'>Save</Button>
                      </DialogActions>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
            <Dialog
              fullWidth={true}
              maxWidth='xl'
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Profile</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can edit your information here.
                  <Formik
                    initialValues={{
                      fullName: user?.fullName,
                      email: user?.email,
                      about_me: '',
                      profile_img: '',
                    }}
                    validationSchema={EditSchema}
                    onSubmit={(values) => {
                      editHandler(values, userId, token);
                    }}
                  >
                    {({ errors, touched, handleChange }) => (
                      <Form>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='fullName'
                              name='fullName'
                              label='Full name'
                              fullWidth
                              autoComplete='given-name'
                              variant='standard'
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='email'
                              name='email'
                              label='E-mail'
                              fullWidth
                              variant='standard'
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id='about'
                              name='about_me'
                              label='About Me'
                              fullWidth
                              autoComplete='about me'
                              variant='standard'
                              onChange={handleChange}
                            />

                            <Grid item xs={12} sm={6}>
                              <TextField
                                id='image'
                                name='profile_img'
                                label='Profile Image URL'
                                fullWidth
                                variant='standard'
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <DialogActions>
                          <Button
                            color='secondary'
                            onClick={() => {
                              handleClose();
                              pwOpen();
                            }}
                          >
                            Change Password
                          </Button>
                          <Button onClick={handleClose}>Close</Button>
                          <Button type='submit' onClick={handleClose}>
                            Save
                          </Button>
                        </DialogActions>
                      </Form>
                    )}
                  </Formik>
                </DialogContentText>
                <Box
                  noValidate
                  component='form'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                  }}
                >
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel htmlFor='max-width'>maxWidth</InputLabel>
                  </FormControl>
                </Box>
              </DialogContent>
            </Dialog>
          </div>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingLeft: '5rem',
              '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
              },
            }}
          >
            <Paper elevation={8} sx={{ paddingTop: '2rem', backgroundColor: mode === 'dark' ? '#4e342e' : 'white', }}>
              <Typography variant='h3'>{userBookshelf.length}</Typography>
              <Typography variant='h6'>Books</Typography>
            </Paper>
            <Paper elevation={8} sx={{ paddingTop: '2rem', backgroundColor: mode === 'dark' ? '#4e342e' : 'white' }}>
              <Typography variant='h3'>{userFollowersList.length}</Typography>
              <Typography variant='h6'>Followers</Typography>
            </Paper>
            <Paper elevation={8} sx={{ paddingTop: '2rem', backgroundColor: mode === 'dark' ? '#4e342e' : 'white' }}>
              <Typography variant='h3'>{userFollowingList.length}</Typography>
              <Typography variant='h6'>Following</Typography>
            </Paper>
          </Box>
        </div>
      </div>

      <div className='about-div' >
        <h2 style={{color: mode === 'dark' ? 'white' : 'black'}}>ABOUT</h2>
        <div className='about'>
          {user?.about_me ? (
            <Typography>{user.about_me}</Typography>
          ) : (
            <div>
              <Typography variant='subtitle2'>
                Write about yourself and your interests of books. You will be
                noted!
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
