import React from 'react';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    link : {
        color : '#757575',
        textDecoration : 'none',
        '&:hover' : {
            textDecoration : 'underline',
        }
    }
}))
function Copyright() {
    const classes = useStyles();
    return (
        <Typography component={'span'} variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link className={classes.link} to="/">
            JULOG
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;