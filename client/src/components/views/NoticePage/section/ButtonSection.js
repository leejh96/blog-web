import React from 'react'
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display: 'flex',
            justifyContent : 'flex-end',
        },
        link : {
            textDecoration : 'none',
            color : 'black',
        }
    }
})
function ButtonSection() {
    const classes = useStyles();
    const user = useSelector(state => state.UserReducer.user);
    return (
        <Box className={classes.area}>
            { user.role === 3 ?
                <Link className={classes.link} to='/notice/edit'><Button variant="contained">글작성</Button></Link>  
                :
                <></>
            }
        </Box>
    )
}

export default ButtonSection
