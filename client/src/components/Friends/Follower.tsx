import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Box from '@mui/material/Box';
import FollowerItem from './FollowerItem';

export default function Follower() {

  const userFollowersList = useSelector((state: RootState) => state.followList.FollowersList)

  return (
    <div >
      <Box>
      {
        userFollowersList.map((follower) => {
          return <FollowerItem key={follower._id} prop = {follower.userId}/>
        })
      }
      </Box>
    </div>
  )
}
