import React from 'react';
import Main from './section/main/Main';
import Change from './section/change/Change';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
    area : {
        minWidth : '768px',
    }
}))
function Setting() {
    const classes = useStyles();
    document.title = 'SETTING'
    const params = useParams();
    return (
        <Box className={classes.area}>
            {!params.change ? <Main /> : <Change />}
        </Box>
    )
}

export default Setting;