import React from 'react'
import NoticeDetail from './section/NoticeDetail';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            flexDirection : 'column',
            marginTop : '10px',
            paddingBottom : '10px',
            justifyContent : 'space-around',
        },
        title : {
            margin : '16px 0',
            fontWeight : 'bold'
        }
    }
})

function Detail() {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant='h5' className={classes.title}>공지사항</Typography>
            <Container className={classes.area} disableGutters>
                <NoticeDetail />
            </Container>
        </Box>
    )
}
export default Detail;