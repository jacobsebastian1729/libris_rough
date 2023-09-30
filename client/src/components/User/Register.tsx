import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// module
import { UserType } from '../../types/type';
import { AppDispatch, RootState } from '../../redux/store';
import { registerUser } from '../../redux/thunk/user';
import { userActions } from '../../redux/slices/user';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please enter your full name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
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
  // termsAndConditions: Yup.bool().oneOf(
  //   [true], 'You need to accept the terms and conditions'),
});

type Prop = {
  mode: string;
};

export default function Register({ mode }: Prop) {
  const [open, setOpen] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const message = useSelector((state: RootState) => state.user.serverMessage);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const registerHandler = (user: UserType) => {
    if (!user) {
      navigate('/register');
      return;
    }
    if (user) {
      dispatch(registerUser(user));
      setOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className='login-div'>
      <Card
        sx={{
          width: 500,
          textAlign: 'center',
          backgroundColor: mode === 'dark' ? '#4e342e' : 'white',
        }}
      >
        <CardHeader
          title='Welcome to LIBRIS'
          sx={{ borderBottom: '1px solid black' }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <Typography>Register</Typography>

          <div className='login-form'>
            <Formik
              validateOnChange={true}
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAndConditions: false,
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                registerHandler(values);
              }}
            >
              {({ errors, touched, handleChange }) => (
                <Form className='signup'>
                  <TextField
                    sx={{ width: '60%' }}
                    id='outlined-basic'
                    label='Full Name'
                    type='text'
                    name='fullName'
                    variant='standard'
                    onChange={handleChange}
                  />
                  {errors.fullName && touched.fullName ? (
                    <p
                      className='input-error'
                      style={{ fontSize: '11px', color: 'red' }}
                    >
                      *{errors.fullName}
                    </p>
                  ) : null}
                  <TextField
                    sx={{ width: '60%' }}
                    id='outlined-basic'
                    label='E-mail'
                    type='text'
                    name='email'
                    variant='standard'
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p
                      className='input-error'
                      style={{ fontSize: '11px', color: 'red' }}
                    >
                      *{errors.email}
                    </p>
                  ) : null}
                  <TextField
                    sx={{ width: '60%' }}
                    id='outlined-basic'
                    label='Password'
                    type={passwordVisibility ? 'text' : 'password'}
                    name='password'
                    variant='standard'
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {passwordVisibility ? (
                            <VisibilityIcon
                              onClick={() => setPasswordVisibility(false)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => setPasswordVisibility(true)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && touched.password ? (
                    <p
                      className='input-error'
                      style={{ fontSize: '11px', color: 'red' }}
                    >
                      *{errors.password}
                    </p>
                  ) : null}
                  <TextField
                    sx={{ width: '60%' }}
                    id='outlined-basic'
                    label='Confirm Password'
                    type={passwordVisibility ? 'text' : 'password'}
                    name='confirmPassword'
                    variant='standard'
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {passwordVisibility ? (
                            <VisibilityIcon
                              onClick={() => setPasswordVisibility(false)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => setPasswordVisibility(true)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p
                      className='input-error'
                      style={{ fontSize: '11px', color: 'red' }}
                    >
                      *{errors.confirmPassword}
                    </p>
                  ) : null}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox {...label} name='termsAndConditions' />
                      <Typography>I agree to the Terms of Service</Typography>
                    </div>
                    {errors.termsAndConditions ? (
                      <p className='input-error'>
                        *{errors.termsAndConditions}
                      </p>
                    ) : null}
                    <Button
                      type='submit'
                      style={{
                        maxWidth: 300,
                        maxHeight: 50,
                        minWidth: 250,
                        minHeight: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={message}
              action={action}
            />
          </div>

          <div
            style={{
              marginTop: '1rem',
              width: '50%',
              borderTop: '1px solid black',
            }}
          >
            <br />
            <Typography>Do you have an account?</Typography>
          </div>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button
              style={{
                maxWidth: 300,
                maxHeight: 50,
                minWidth: 250,
                minHeight: 50,
                marginTop: '1rem',
              }}
            >
              <ArrowBackIosIcon />
              Back To Log In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
