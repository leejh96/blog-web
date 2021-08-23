import React from 'react';
import MarkdownEditor from '../../Markdown/MarkdownEditor';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

function StudyEdit() {
    const {study} = useParams();
    return (
        <Container disableGutters>
            <h2>{study}</h2>
            <Box>
                <MarkdownEditor page={study}/>
            </Box>
        </Container>
    )
}

export default StudyEdit;
