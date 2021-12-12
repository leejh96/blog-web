import React, { Fragment } from 'react'
// import Navbar from '../components/views/NavBar/Navbar';
import NavbarEx from '../components/views/NavBar/NavbarEx';

import SideBar from '../components/views/SideBar/SideBar'

import Footer from '../components/views/Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        main: {
            display: 'flex',
            minWidth: '480px',
            [theme.breakpoints.down('md')]: {
                margin: 0,
                justifyContent: 'center'
            },
        },
        content: {
            width: 'calc(100% - 200px)',
            [theme.breakpoints.down('md')]: {
                margin: 0,
                width: '100%',
            },
            minWidth: '480px',
        }
    }
});

function Frame(Component) {
    function WithFrameComponent() {
        const classes = useStyles();
        return (
            <Fragment>
                <NavbarEx />
                <Container className={classes.main} disableGutters>
                    <SideBar />
                    <Container className={classes.content}>
                        <Component />
                    </Container>
                </Container>
                <Footer />
            </Fragment>
        )
    }
    return WithFrameComponent
}

export default Frame
