import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

}));

function Title() {
    const classes = useStyles();

    return (
        <Box className={classes.area}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
        </Box>
    )
}

export default Title
