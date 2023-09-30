import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lottie from 'react-lottie';
import searchUser from '../../asset/98723-search-users.json';
import searchBook from '../../asset/99349-girl-with-books.json';

import './DashBoard.css';
import { Link } from 'react-router-dom';

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: searchUser,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: searchBook,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type Prop = {
  mode: string;
};

export default function DashBoard({ mode }: Prop) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h2'>Welcome to Dashboard</Typography>
      </div>
      <div className='dashboard'>
        <Card
          sx={{ width: 300, maxWidth: 345, marginRight: '1rem', height: '58%' }}
          className='user-board'
        >
          <Lottie options={defaultOptions1} height={250} width={250} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Users
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Link to='/dashboard/users' style={{ textDecoration: 'none' }}>
              <Button size='small'>User Management</Button>
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: 300, maxWidth: 345, height: '58%' }}>
          <Lottie options={defaultOptions2} height={250} width={250} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Books
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Link to='/dashboard/books' style={{ textDecoration: 'none' }}>
              <Button size='small'>Book Management</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
