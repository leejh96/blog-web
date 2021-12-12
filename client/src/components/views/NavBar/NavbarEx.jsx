import React from 'react';
import AuthTEx from './section/AuthTEx.jsx';
import AuthFEx from './section/AuthFEx.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideSection from './section/SideSection';
import AuthWrap from './AuthWrap';
import styled from 'styled-components';

const Nav = styled.nav``;

function Navbar() {
    const user = useSelector(state => state.UserReducer.user);
    return (
        <nav>
            <AuthWrap>
                {Object.keys(user).length > 0 ? <AuthTEx /> : <AuthFEx/>}
            </AuthWrap>
            <h1>
                <a href="/">JULOG</a>
            </h1>
        </nav>
        // <Container className={classes.area} disableGutters maxWidth='xl'>
        //     <AuthWrap>
        //         {Object.keys(user).length > 0 ? <AuthTEx /> : <AuthFEx />}
        //     </AuthWrap>
        //     <Box className={classes.logoBox}>
        //         <Typography variant='h4' className={classes.logo}>
        //             <Link to='/' className={classes.link}>JULOG</Link>
        //         </Typography>
        //         <Box className={classes.side}>
        //             <SideSection />
        //         </Box>
        //     </Box>
        // </Container>
    )
}

export default Navbar;