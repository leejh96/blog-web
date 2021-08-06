import React from 'react'
import Info from './section/Info';
import Text from './section/Text';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title : {
        margin : '16px 0',
        fontWeight : 'bold'
    }
}))

function Main() {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant='h5' className={classes.title}>내 정보</Typography>
            <Info />
            <Text />
        </Box>
    )
}

export default Main
