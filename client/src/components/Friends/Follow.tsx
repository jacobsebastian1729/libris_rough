import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Box from '@mui/material/Box';
import FollowItem from './FollowItem';

export default function Follow() {

  const userFollowingList = useSelector((state: RootState) => state.followList.FollowingList)

  


  return (
    <div >
      <Box>
      {
        userFollowingList.map((following) => {
          return <FollowItem key={following._id} prop = {following.followingId}/>
        })
      }
      </Box>
    </div>
  )
}
