import React from 'react'
import axios from 'axios'

import { commentActions } from '../slices/comment'
import { AppDispatch } from '../store'

export default function fetchProductComment(url: string){
    return async (dispatch: AppDispatch) => {
        try {
            
            const response = await fetch(url);
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const productComment = await response.json();
            dispatch(commentActions.getProductCommentList(productComment))

        } catch (error) {
            
        }
    }
}


