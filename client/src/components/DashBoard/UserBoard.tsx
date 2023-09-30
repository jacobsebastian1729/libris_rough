import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@mui/material/Button';
import { TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@mui/material/Table';

import { AppDispatch, RootState } from '../../redux/store';
import { getAllUserData, userStatusChangeThunk } from '../../redux/thunk/user';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';

function createData(
  Id: string,
  Name: string,
  Email: string,
  Status: string,
  Role: string,
  Books: [],
  Following: [],
  Followers: [],
  Comments: []
) {
  return {
    Id,
    Name,
    Email,
    Status,
    Role,
    Books,
    Following,
    Followers,
    Comments,
  };
}

const rows = [];

export default function UserBoard() {
  const allUsers = useSelector((state: RootState) => state.user.users);
  const [status, setStatus] = useState<string>('inactive');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllUserData());
  }, [status]);

  const handleStatusChange = async (userId: string) => {
    await dispatch(userStatusChangeThunk(userId));

    const statusOrder = ['inactive', 'active', 'banned', 'inactive'];
    const nextStatusIndex = statusOrder.indexOf(status) + 1;
    const nextStatus = statusOrder[nextStatusIndex];
    setStatus(nextStatus);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h2'>User Management</Typography>
      </div>
      <div style={{ textAlign: 'right', paddingRight: '3rem', marginBottom: '2rem'}}>
        <Typography>database : {allUsers.length} users</Typography>
      </div>
      <TableContainer component={Paper} sx={{ marginLeft: '.5rem' }}>
        <Table aria-label='simple table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Role</TableCell>
              <TableCell align='right'>Books</TableCell>
              <TableCell align='right'>Following</TableCell>
              <TableCell align='right'>Followers</TableCell>
              <TableCell align='right'>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((row) => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row._id}
                </TableCell>
                <TableCell align='right'>{row.fullName}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>
                  {row.status === 'inactive' ? (
                    <Button
                      variant='outlined'
                      color='error'
                      style={{ borderRadius: 50 }}
                      onClick={() => handleStatusChange(row._id)}
                    >
                      {row.status}
                    </Button>
                  ) : row.status === 'active' ? (
                    <Button
                      variant='outlined'
                      color='success'
                      style={{
                        borderRadius: 50,
                        color: 'green',
                        fontWeight: '800',
                      }}
                      onClick={() => handleStatusChange(row._id)}
                    >
                      {row.status}
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: 50 }}
                      onClick={() => handleStatusChange(row._id)}
                    >
                      {row.status}
                    </Button>
                  )}
                </TableCell>
                <TableCell align='right'>
                  {row.isAdmin ? (
                    <Typography color={red[800]}>Admin</Typography>
                  ) : (
                    <Typography>User</Typography>
                  )}
                </TableCell>
                <TableCell
                  align='right'
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  {row.bookShelves.length}
                </TableCell>
                <TableCell
                  align='right'
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  {row.following.length}
                </TableCell>
                <TableCell
                  align='right'
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  {row.followers.length}
                </TableCell>
                {/* <TableCell align="right">{row.comments}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
