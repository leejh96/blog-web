import React from 'react';
import Intro from './section/Introduce';
import Notice from './section/Notice';
import RecentPost from './section/RecentPost';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            marginTop : '10px',
            paddingBottom : '10px',
            justifyContent : 'space-around',
            [theme.breakpoints.down('md')]: {
                flexDirection : 'column',
                alignItems : 'center',
            },
        }
    }
})

function Main() {
    const classes = useStyles();
    document.title = 'JULOG'
    return (
        <>
            <Intro />
            <Container className={classes.area} disableGutters>
                <Notice />
                <RecentPost />
            </Container>
        </>
    )
}
export default Main
