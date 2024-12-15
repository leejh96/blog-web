import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles( theme => {
    return {
        area : {
            border: '1px solid black',
            width : '40%',
            height : '500px',
            borderRadius : '25px 25px 25px 25px',
            boxShadow : '5px 5px 5px rgba(0,0,0,0.3)',
            [theme.breakpoints.down('md')]: {
                marginBottom : '20px',
                width : '60%',
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom : '20px',
                width : '100%',
            },
        }
    }
})

function BoxWrap({ children }) {
    const classes = useStyles();
    return (
        <Box className={classes.area}>
            {children}
        </Box>
    )
}

export default BoxWrap
