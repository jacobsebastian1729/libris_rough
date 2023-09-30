import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@mui/material/Button';
import { TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@mui/material/Table';
import Rating from '@mui/material/Rating';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Typography from '@mui/material/Typography';


import { AppDispatch, RootState } from '../../redux/store';
import { fetchbookData } from '../../redux/thunk/book';
import BookForm from '../BookForm/BookForm';

function createData(
  Id: string,
  Title: string,
  Author: string,
  Rating: number
 
  //   Comments: []
) {
  return {
    Id,
    Title,
    Author,
    Rating,
  };
}

const rows = [];

export default function BooksBoard() {
  const [open, setOpen] = React.useState(false)
  const allBooks = useSelector((state: RootState) => state.bookItem.Book);
  const bookDataLength = allBooks.length

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchbookData());
  }, [bookDataLength]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h2'>Books Management</Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            paddingRight: '1rem',
          }}
        >
          <Button color='inherit' onClick={handleClickOpen}>
          <LibraryAddIcon style={{color:'green'}}/>
          <Typography style={{color:'green'}}>Add More Books</Typography>
          </Button>
          <BookForm open={open} handleClose={handleClose} />
        </div>
        <div style={{ paddingRight: '2rem', textAlign: 'right', marginBottom: '1rem',}}>
          <Typography>database: {bookDataLength} books</Typography>
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{ marginLeft: '.5rem', paddingRight: '.5rem' }}
      >
        <Table aria-label='simple table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align='left'>Author</TableCell>
              <TableCell align='center'>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBooks.map((row) => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row._id}
                </TableCell>
                <TableCell align='left'>{row.title}</TableCell>
                <TableCell align='left'>{row.author}</TableCell>
                <TableCell align='center'>
                  <Rating name='read-only' value={row.rating} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
