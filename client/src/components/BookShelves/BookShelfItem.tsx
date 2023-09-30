import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './BookShelf.css'

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import { BookShelf } from '../../types/type'
import BookShelfItemComponent from './BookShelfItemComponent';

import './BookShelf.css'
import axios from 'axios';

type OneBookShelfs = {
  prop: BookShelf
} 

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BookShelfItem({prop}: OneBookShelfs) {


  const [open, setOpen] = React.useState(false);


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  const userInfo = useSelector((state:RootState) => state.user.loginUser)


  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [message, setMessage] = React.useState('');

  const followingIdUrl = `http://localhost:8000/following/${userInfo?._id}`;

  function addToFollowing(){
    if(userInfo?._id != prop.userId._id){
    axios
      .post(followingIdUrl, {
        followingId: prop.userId._id
      })
      .then((res) => setMessage(res.data.message))
      .catch((error) => console.log(error))

      setOpenModal(false)
      setOpen(true);
    }
      else{
        setMessage("its your bookshelf")
        setOpenModal(false)
        setOpen(true)
      }
  }

  return (
    <div>
      <Box className="shelf_outer"  sx={{ flexGrow: 1, paddingLeft: 2, marginTop: -2 }}>
        <Link
        to=''
        onClick={handleOpenModal}
        >
      <Typography className="shelf_outer_content" variant="body1" sx={{ fontWeight: 700, display: 'inline-block' }} mt={2} ml={12.7} p = {.7}>
              {prop.userId.email}
        </Typography>
        </Link>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You wish to follow {prop.userId.email}
          </Typography>
          <Button variant="outlined" onClick={addToFollowing}>Yes</Button>
          <Button variant="outlined" onClick={handleCloseModal}>No</Button>
          
        </Box>
      </Modal>
        <Box display = 'flex' 
        justifyContent='center' 
        mt = {0}
        >
        <Box className="horizontal-section">
            {
              prop.books.map((book) => {
                
                  return <BookShelfItemComponent key={book._id} prop = {book}/>
              })
            }
                
    
  </Box>
  </Box>
      </Box>
      <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={prop.userId.email +  '  ' + message}
        

      />
    </div>
  )
}
