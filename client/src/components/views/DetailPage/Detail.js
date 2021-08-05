import React from 'react'
import NoticeDetail from './section/NoticeDetail';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            flexDirection : 'column',
            marginTop : '10px',
            paddingBottom : '10px',
            justifyContent : 'space-around',
        }
    }
})

function Detail() {
    const classes = useStyles();
    return (
        <Box>
            <h2>공지사항</h2>
            <Container className={classes.area} disableGutters>
                <NoticeDetail />
            </Container>
        </Box>
    )
}
export default Detail;