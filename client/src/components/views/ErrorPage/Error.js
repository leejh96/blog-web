import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Notfound from './section/Notfound'

const useStyles = makeStyles(theme => ({
    area : {
        height : '100vh',
        width : '100%'
    }
}))

function Error() {
    const classes = useStyles();
    return (
        <Box className={classes.area}>
            <Notfound />
        </Box>    
    )
}

export default Error
