import React, { useEffect, useState } from 'react';
import MarkdownSection from '../Markdown/Markdown';
import { useParams } from 'react-router-dom';
import Comment from './section/Comment';
import CommentTable from './section/CommentTable';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        area : {
            width : '100%',
            marginTop : '10px',
            paddingBottom : '10px',
        },
        title : {
            margin : '16px 0',
            fontWeight : 'bold'
        }
    }
})

function Study() {
    const classes = useStyles();
    document.title = 'STUDY'
    const { study } = useParams();
    const [page, setPage] = useState('');
    useEffect(() => {
        setPage(study);
    }, [study])
    return (
        <Box>
            <Typography variant='h5' className={classes.title}>{page}</Typography>
            <Container className={classes.area} disableGutters>
                <MarkdownSection />
                <CommentTable />
                <Comment />
            </Container>
        </Box>
    )
}

export default Study
