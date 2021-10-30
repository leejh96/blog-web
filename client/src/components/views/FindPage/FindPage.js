import React from 'react'
// import Input from './section/Input';
import InputEx from './section/InputEx';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    area: {
        paddingTop: '8%',
        paddingBottom: '8%',

    },
}));

function FindPage() {
    const classes = useStyles();
    return (
        <Container className={classes.area} maxWidth="xs" disableGutters>
            {/* <Input /> */}
            <InputEx />
        </Container>
    )
}

export default FindPage
