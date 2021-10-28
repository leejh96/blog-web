import React from 'react';
// import AuthF from './section/AuthF';
// import AuthT from './section/AuthT';
import AuthTEx from './section/AuthTEx.jsx';
import AuthFEx from './section/AuthFEx.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideSection from './section/SideSection';
import AuthWrap from './AuthWrap';

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
        },
        side : {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display : 'flex',
            },
        }
    }
})
function Navbar() {
    const user = useSelector(state => state.UserReducer.user);
    const classes = useStyles();

    // return (
    //     <Container className={classes.area} disableGutters maxWidth='xl'>
    //         {Object.keys(user).length > 0 ? <AuthT /> : <AuthF />}

    //         <Box className={classes.logoBox}>
    //             <Typography variant='h4' className={classes.logo}>
    //                 <Link to='/' className={classes.link}>JULOG</Link>
    //             </Typography>
    //             <Box className={classes.side}>
    //                 <SideSection />
    //             </Box>
    //         </Box>
    //     </Container>
    // )
    return (
        <Container className={classes.area} disableGutters maxWidth='xl'>
            <AuthWrap>
                {Object.keys(user).length > 0 ? <AuthTEx /> : <AuthFEx />}
            </AuthWrap>
            <Box className={classes.logoBox}>
                <Typography variant='h4' className={classes.logo}>
                    <Link to='/' className={classes.link}>JULOG</Link>
                </Typography>
                <Box className={classes.side}>
                    <SideSection />
                </Box>
            </Box>
        </Container>
    )
}

export default Navbar;