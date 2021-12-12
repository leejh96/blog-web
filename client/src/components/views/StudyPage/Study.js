import React from 'react';
import MarkdownSection from '../Markdown/Markdown';
import Comment from './section/Comment';
import CommentTable from './section/CommentTable';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Fab } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const useStyles = makeStyles(theme => {
    return {
        area: {
            width: '100%',
            paddingBottom: '10px',
        },
        title: {
            margin: '16px 0',
            fontWeight: 'bold'
        },
        upFab: {
            position: 'fixed',
            bottom: '100px',
            right: '30px',
        },
        downFab: {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
        },
    }
})

function Study() {
    const classes = useStyles();
    document.title = 'STUDY'
    const handleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleBottom = (e) => {
        e.preventDefault();
        document.querySelector('#bottom').scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <Box>
            <Container className={classes.area} disableGutters>
                <MarkdownSection />
                <CommentTable />
                <Comment />
            </Container>
            <Typography id='bottom'></Typography>
            <Box>
                <Fab className={classes.upFab} onClick={handleTop}><ArrowDropUpIcon /></Fab>
                <Fab className={classes.downFab} onClick={handleBottom}><ArrowDropDownIcon /></Fab>
            </Box>
        </Box>
    )
}

export default Study
