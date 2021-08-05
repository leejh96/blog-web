import React from 'react'
import Navbar from '../components/views/NavBar/Navbar';
import Sidebar from '../components/views/SideBar/Sidebar';
import Footer from '../components/views/Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        main : {
            marginLeft : '15%',
            marginRight : '15%',
            display : 'flex',
            minWidth : '480px',
            [theme.breakpoints.down('md')]: {
                margin: 0,
                justifyContent : 'center'
            },
        },
        content : {
            width : 'calc(100% - 200px)',
            [theme.breakpoints.down('md')]: {
                margin: 0,
                width : '100%',
            },
            minWidth : '480px',
        }
    }
});

function Frame(Component) {
    function WithFrameComponent(){
        const classes = useStyles();
        return (        
            <>
                <Navbar />
                <Container className={classes.main} disableGutters>
                    <Sidebar />
                    <Container className={classes.content}>
                        <Component />
                    </Container>
                </Container>
                <Footer />
            </>
        )
    }
    return WithFrameComponent
}

export default Frame
