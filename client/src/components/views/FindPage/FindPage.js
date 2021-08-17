import React from 'react'
import Input from './section/Input';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    area : {
        paddingTop : '8%',
        paddingBottom : '8%',

    },
}));

function FindPage() {
    const classes = useStyles();
    return (
        <Container className={classes.area} maxWidth="xs" disableGutters>
            <Input />
        </Container>
    )
}

export default FindPage
