import React from 'react';
import {Typography} from '@material-ui/core'
import {Link} from 'react-router-dom';
function Copyright() {
    return (
      <Typography component={'span'} variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link style={{
          color:"#757575",
          textDecoration: 'none'
        }} to="/">
          주혁's 블로그
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright;