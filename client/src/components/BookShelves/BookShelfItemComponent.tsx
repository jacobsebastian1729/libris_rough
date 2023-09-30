import React from 'react'
import { Link } from 'react-router-dom';

import Box from "@mui/material/Box";

import './BookShelf.css'
import { BookType } from '../../types/type';

type OneBookType = {
    prop: BookType
}

export default function BookShelfItemComponent({prop}: OneBookType){
    return <Box className = 'item'>
        <Link
    to={`/books/${prop._id}`}
    className="link"
    style={{ textDecoration: "none"}}
    >
        <img src={prop.thumbnail} width= '100%' height= '100%' object-fit= 'cover'/>
        </Link>
        </Box>
}