import React from 'react'
import TableSection from './section/TableSection';
import Pagination from './section/Pagination';
import Search from './section/Search';
import ButtonSection from './section/ButtonSection';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';

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
function Notice() {
    document.title = 'NOTICE'
    const classes = useStyles();

    return (
        <Box>
            <h2>공지사항</h2>
            <Container className={classes.area} disableGutters>
                <TableSection />
                <ButtonSection />
                <Pagination />
                <Search />
            </Container>
        </Box>
    )
}

export default Notice
