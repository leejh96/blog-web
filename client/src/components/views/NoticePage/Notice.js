import React from 'react'
import TableSection from './section/TableSection';
import Pagination from './section/Pagination';
import Search from './section/Search';
import ButtonSection from './section/ButtonSection';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'space-around',
        },
        title : {
            margin : '16px 0',
            fontWeight : 'bold'
        }
    }
})
function Notice() {
    document.title = 'NOTICE'
    const classes = useStyles();
    const search = useSelector(state => state.NoticeReducer.search);
    return (
        <Box>
            <Typography className={classes.title} variant='h5'>공지사항</Typography>
            <Container className={classes.area} disableGutters>
                <TableSection />
                <ButtonSection />
                {!search && <Pagination />}
                <Search />
            </Container>
        </Box>
    )
}

export default Notice
