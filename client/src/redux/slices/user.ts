//  product slice here
import { createSlice } from '@reduxjs/toolkit';

import { UserDataType } from '../../types/type';

type InitialState = {
  users: UserDataType[];
  loginSuccess: boolean;
  serverMessage: string;
  loginUser: UserDataType | null;
  loginUserBookShelf : string[],
  status: string;
  
};

const initialState: InitialState = {
  users: [],
  loginSuccess: false,
  serverMessage: '',
  loginUser: {
    _id: '',
    fullName: '',
    email: '',
    isAdmin: false,
    status: 'inactive',
    followers: [''],
    following: [''],
    bookShelves: [''],
    // comments: []
  },
  loginUserBookShelf: [''],
  status: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload
    },
    loginAction: (state, action) => {
      state.loginSuccess = action.payload;
    },
    getLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    setMessage: (state, action) => {
      state.serverMessage = action.payload;
    },
    logoutAction: (state) => {
      state.loginUser = null;
      state.loginSuccess = false;
      localStorage.removeItem('userToken');
    },
    setUserBookShelf : (state, action) => {
      state.loginUserBookShelf = action.payload
    },
    getStatus: (state, action) => {
      state.status = action.payload
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
