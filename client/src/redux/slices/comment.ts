import React from 'react';

import { createSlice } from '@reduxjs/toolkit';

import { CommentType } from '../../types/type';

type InitialState = {
    productCommentList: CommentType[];
    
};


const initialState: InitialState = {
    productCommentList : [],
   
};

const commentSlice = createSlice({
    name: 'commentList',
    initialState,
    reducers: {
        getProductCommentList: (state, action) => {
            state.productCommentList = action.payload;
        },
        
    }
})

const commentsReducer = commentSlice.reducer;
export default commentsReducer;
export const commentActions = commentSlice.actions;