import React from 'react';
import Follow from './Follow';
import Follower from './Follower';


import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './Friends.css'

//////////////////////////////////////////
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


//////////////////////////////

export default function Friends() {
/////////////////////////////
const [value, setValue] = React.useState(0);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};
///////////////////////

const userFollowingList = useSelector((state: RootState) => state.followList.FollowingList)
const userFollowersList = useSelector((state: RootState) => state.followList.FollowersList)

const followingLen = userFollowingList.length;
const followerLen = userFollowersList.length;

const followingHeight = (((followingLen)/(followingLen+followerLen))*90) + 2;
const followingHeightString = followingHeight.toFixed(0) + "%";

const followerHeight = (((followerLen)/(followingLen+followerLen))*90) + 2;
const followerHeightString = followerHeight.toFixed(0) + "%";


  return (
    <div >
      <div className='chart_component'>
      <div className="chart">
  <div className="bar1" style={{height: followingHeightString}}>
  <p className="info">{followingLen} Following</p>
  </div>
  <div className="bar2" style={{height: followerHeightString}}>
  <p className="info">{followerLen} Followers</p>
  </div>
</div>
      </div>


      <div className='followlist'>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Following" {...a11yProps(0)} />
          <Tab label="Followers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Follow />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Follower />
      </TabPanel>
  
    </Box>

      </div>

      
      
      
    </div>
  );
}
