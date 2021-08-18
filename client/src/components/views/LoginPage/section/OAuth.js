import React from 'react';
import { Box, Icon, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    oauth : {
      display : 'flex',
      justifyContent : 'center',
    },
}));
  

function OAuth() {
    const classes = useStyles();
    return (
        <Box className={classes.oauth} mt={2}>
            <IconButton href='http://localhost:5000/api/auth/google'>{/*axios를 사용하면 오류가 떠서 링크로바꿔줌*/}
                <Icon className='fab fa-google'></Icon>
            </IconButton>
        </Box>
    )
}

export default OAuth
