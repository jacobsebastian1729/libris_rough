import React from 'react'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

type followItem = {
    _id: string,
    email: string
}

type Following = {
    prop: followItem
}

export default function FollowItem({prop}: Following){


    function getAvatarColor(): string {
        let sum = 1;
        let str = prop.email;
        for (let i = 0; i < str.length; i++) {
          sum *= str.charCodeAt(i);
        }
        let remainder = sum % 360;
        let h = remainder;
        let s = 0.5;
        let v = 0.7;
        let c = v * s;
        let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        let m = v - c;
        let r = 0;
        let g = 0;
        let b = 0;
        if (h >= 0 && h < 60) {
          r = c;
          g = x;
        } else if (h >= 60 && h < 120) {
          r = x;
          g = c;
        } else if (h >= 120 && h < 180) {
          g = c;
          b = x;
        } else if (h >= 180 && h < 240) {
          g = x;
          b = c;
        } else if (h >= 240 && h < 300) {
          r = x;
          b = c;
        } else if (h >= 300 && h < 360) {
          r = c;
          b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }
    
      function componentToHex(c: number): string {
        let hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
      }
      const bgavatar = getAvatarColor();


    return <div>
        <Grid container spacing={0} p={.4} >
        <Grid
          item
          xs={6}
          style={{ color: 'black',  backgroundColor: '#f2f2f2', border: '1px solid #c0c0c0', borderRadius: '7px' }}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
            <Grid
            display='flex'
            justifyContent='space-between'
          alignItems='center'
            >
            <Avatar sx={{ bgcolor: bgavatar, mt: 0.3, mr: 1, ml: 0.8, mb:1, p:1 }}>
            {prop.email.charAt(0).toUpperCase()}
          </Avatar>

          
            <Typography
              variant='body1'
              sx={{ backgroundColor: '#f2f2f2', color: '#555555' }}
            >
              {prop.email}{' '}
            </Typography>
          </Grid>
          <Button variant="contained" color="secondary" sx={{mr: 1}}>UnFollow</Button>

        </Grid>
        
        </Grid>
    </div>
}