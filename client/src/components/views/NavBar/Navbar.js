import React, { useEffect } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authOAuth } from '../../../actions/UserAction';

const useStyles = makeStyles(theme => {
    return {
        area : {
            margin : 0,
            textAlign : 'center',
            minWidth : '480px',
            borderBottom : '0.25px solid #dcdcdc',
        },
        link : {
            textDecoration :'none',
            color :'black',
        },
        logoBox : {
            padding : '1.5rem 0',
        },
        logo : {
            fontWeight : 'bold'
        }
    }
})
function Navbar() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authOAuth())
    }, [dispatch])
    const user = useSelector(state => state.UserReducer.user);
    const classes = useStyles();
    return (
        <Container className={classes.area} disableGutters maxWidth='xl'>
            {user ? <AuthT /> : <AuthF />}
            <Box className={classes.logoBox}>
                <Typography variant='h4' className={classes.logo}>
                    <Link to='/' className={classes.link}>JULOG</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Navbar;