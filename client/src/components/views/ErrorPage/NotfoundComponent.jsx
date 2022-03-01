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
    },
    btnArea : {
        marginTop : '24px',
        display :'flex',
        width : '50%',
        justifyContent : 'center'
    }
}))

function Notfound() {
    const classes = useStlyes();
    const history = useHistory();
    const onClickHome = () => {
        history.push('/');
    }
    return (
        <Box className={classes.area}>
            <Typography variant='h5'>NOT FOUND(404)</Typography>
            <Typography variant='h2'>페이지가 존재하지 않습니다</Typography>
            <Box className={classes.btnArea}>
                <Button  variant='contained' color='primary' onClick={onClickHome}>홈으로</Button>
            </Box>
        </Box>
    )
}

export default Notfound
