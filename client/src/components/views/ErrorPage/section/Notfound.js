import React from 'react'
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStlyes = makeStyles(theme => ({
    area : {
        display : 'flex',
        widht : '100%',
        height : '100vh',
        justifyContent :'center',
        alignItems : 'center',
        flexDirection : 'column',
        backgroundColor : 'black',
        color : 'white',
    }
}))

function Notfound() {
    const classes = useStlyes();
    const history = useHistory();
    const onClickBtn = () => {
        history.goBack();
    }
    return (
        <Box className={classes.area}>
            <Typography variant='h5'>NOT FOUND(404)</Typography>
            <Typography variant='h2'>페이지가 존재하지 않습니다</Typography>
            <Button variant='contained' color='primary' onClick={onClickBtn}>뒤로가기</Button>
        </Box>
    )
}

export default Notfound
