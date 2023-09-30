import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createBookThunk, fetchbookData } from '../../redux/thunk/book';

type PropType = {
  open: boolean;
  handleClose: Function;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function BookForm({ open, handleClose }: PropType) {
  const [book, setBook] = useState({
    title: '',
    category: '',
    genre: '',
    author: '',
    thumbnail: '',
    rating: 0,
    language: '',
    description: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(createBookThunk(book));

    dispatch(fetchbookData())
    handleClose();
    
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => handleClose()}
      TransitionComponent={Transition}
    >
      <AppBar color='inherit' sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => handleClose()}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Cancel
          </Typography>
          <Button
            autoFocus
            color='success'
            onClick={() => handleClose()}
            size='large'
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText
            primary='This is Admin only page'
            secondary='Hi. Freddie Mercury'
          />
        </ListItem>
        <Divider />

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3'>Book Add Form</Typography>
          <TextField
            label='Title'
            value={book.title}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
          <TextField
            label='Author'
            value={book.author}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
          <TextField
            label='Thumbnail'
            value={book.thumbnail}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, thumbnail: e.target.value })}
          />
          <TextField
            label='Description'
            value={book.description}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
          <TextField
            label='Language'
            value={book.language}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, language: e.target.value })}
          />
          <TextField
            label='Rating'
            value={book.rating}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) =>
              setBook({ ...book, rating: Number(e.target.value) })
            }
          />
          <TextField
            label='Category'
            value={book.category}
            sx={{ marginTop: '3rem', width: '60%' }}
            onChange={(e) => setBook({ ...book, category: e.target.value })}
          />
          <FormControl
            sx={{ marginTop: '3rem', width: '60%', marginBottom: '3rem' }}
          >
            <InputLabel>Genre</InputLabel>
            <Select
              value={book.genre}
              onChange={(e) => setBook({ ...book, genre: e.target.value })}
            >
              <MenuItem value='Novel'>Novel</MenuItem>
              <MenuItem value='children'>Children</MenuItem>
              <MenuItem value='Romance'>Romance</MenuItem>
            </Select>
          </FormControl>

          <Button type='submit' variant='contained' startIcon={<Add />}>
            Add Book
          </Button>
        </form>
      </List>
    </Dialog>
  );
}
