import React from 'react'

import { createSlice } from '@reduxjs/toolkit'

import { UserFollowingType } from '../../types/type'
import { UserFollowersType } from '../../types/type'

type InitialState = {
    FollowingList: UserFollowingType[];
    FollowersList: UserFollowersType[];
};

const initialState: InitialState ={
    FollowingList: [],
    FollowersList: [],
};

const followSlice = createSlice({
    name: 'followlist',
    initialState,
    reducers: {
        getUserFollowingList: (state, action) => {
            state.FollowingList = action.payload
        },

        getUserFollwersList: (state, action) => {
            state.FollowersList =action.payload
        }
    }
})

const followReducer = followSlice.reducer;
export default followReducer;
export const followAction = followSlice.actions;