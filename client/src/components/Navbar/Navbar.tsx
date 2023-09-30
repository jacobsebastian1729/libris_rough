import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@mui/material/IconButton';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { AppDispatch, RootState } from '../../redux/store';
import { userActions } from '../../redux/slices/user';
import './NavBar.css';

type Prop = {
  mode: string;
  toggleMode: Function;
};
export default function Navbar({ mode, toggleMode }: Prop) {
  const userLogin = useSelector((state: RootState) => state.user.loginUser);
  const [userId, setUserId] = useState<string | null>(null);
  const [initial, setInitial] = useState<string | null>(null);
  console.log('userLogin', userLogin, 'userId', userId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      borderTop: '5px solid black',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      color: mode === 'dark' ? 'white' : 'black',
    },
    navButton: {
      margin: theme.spacing(0, 1),
      color: mode === 'dark' ? 'white' : 'black',
    },
    rightNavButton: {
      margin: theme.spacing(0, 1),
      color: mode === 'dark' ? 'white' : 'black',
    },
    appbar: {
      backgroundColor: mode === 'dark' ? '#4e342e' : 'white',
      color: mode === 'dark' ? 'white' : 'black',
    },
    darkThemeIcon: {
      color: 'black',
      cursor: 'pointer',
    },
    lightThemeIcon: {
      color: 'white',
      cursor: 'pointer',
    },
  }));

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(userActions.logoutAction());
    navigate('/');
  };

  useEffect(() => {
    if (!userLogin) {
      return;
    }
    if (userLogin) {
      const name = userLogin.fullName;
      const userInitial = name?.charAt(0).toUpperCase();

      setUserId(userLogin._id);
      setInitial(userInitial);
    }
  }, [userLogin]);

  console.log('mode', mode);

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none', marginRight: '2rem' }}>
            <Typography variant='h3' className={classes.title}>
              LIBRIS
            </Typography>
          </Link>

          <Link to='/books' style={{ textDecoration: 'none' }}>
            <Button color='inherit' className={classes.navButton}>
              Books
            </Button>
          </Link>
          {userId && userLogin !== null && (
            <Link
              to={userId ? `/${userId}/books` : `/mybooks`}
              style={{ textDecoration: 'none' }}
            >
              <Button color='inherit' className={classes.navButton}>
                MyBooks
              </Button>
            </Link>
          )}
          <Link to='/bookshelves/all' style={{ textDecoration: 'none' }}>
            <Button color='inherit' className={classes.navButton}>
              BookShelves
            </Button>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          {}
          {userLogin && userId !== '' && userId ? (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tooltip title='Account settings'>
                  <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepPurple[500],
                        marginRight: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {initial}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  style: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {userLogin?.isAdmin === true ? (
                  <Link
                    to='/dashboard'
                    style={{
                      textDecoration: 'none',
                      color: 'green',
                      fontWeight: '900',
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      style={{
                        backgroundColor: mode === 'dark' ? 'green' : 'white',
                        color: mode === 'dark' ? 'white' : 'green',
                      }}
                    >
                      <ListItemIcon>
                        <DashboardIcon fontSize='small' />
                      </ListItemIcon>
                      DASHBOARD
                    </MenuItem>
                  </Link>
                ) : null}
                <Link
                  to={userId ? `/${userId}/books` : `/mybooks`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose} className={classes.appbar}>
                    <ListItemIcon>
                      <AutoStoriesIcon fontSize='small' />
                    </ListItemIcon>
                    My Books
                  </MenuItem>
                </Link>
                <Link
                  to={`/${userId}/friends`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose} className={classes.appbar}>
                    <ListItemIcon>
                      <PeopleIcon fontSize='small' />
                    </ListItemIcon>
                    Friends
                  </MenuItem>
                </Link>

                <Divider />
                <Link
                  to='/subscription'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose} className={classes.appbar}>
                    <ListItemIcon>
                      <AddBoxIcon fontSize='small' />
                    </ListItemIcon>
                    Subscription
                  </MenuItem>
                </Link>
                <Link
                  to={`/${userId}/setting`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose} className={classes.appbar}>
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </Link>

                <MenuItem
                  className={classes.appbar}
                  onClick={() => {
                    handleClose();
                    logoutHandler();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Button color='inherit' className={classes.rightNavButton}>
                Login
              </Button>
            </Link>
          )}

          <IconButton sx={{ ml: 1 }} color='inherit'>
            {mode === 'light' ? (
              <Brightness7Icon
                onClick={() => toggleMode()}
                className={classes.darkThemeIcon}
              />
            ) : (
              <Brightness4Icon
                onClick={() => toggleMode()}
                className={classes.lightThemeIcon}
              />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
