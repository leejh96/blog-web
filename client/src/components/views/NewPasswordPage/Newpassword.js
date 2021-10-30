import React from 'react'
// import Password from './section/Password';
import PasswordEx from './section/PasswordEx';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    area: {
        paddingTop: '8%',
        paddingBottom: '8%',
    },
}));

function Newpassword() {
    const classes = useStyles();
    return (
        <Container className={classes.area} maxWidth="xs" disableGutters>
            {/* <Password /> */}
            <PasswordEx />
        </Container>
    )
}

export default Newpassword
