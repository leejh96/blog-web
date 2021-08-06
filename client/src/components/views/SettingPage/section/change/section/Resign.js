import React from 'react'
import { Button, Box, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resignUser } from '../../../../../../actions/UserAction';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
    text : {
        fontSize : '2rem'
    },
    textArea : {
        textAlign : 'center',
        marginBottom : '32px',
    }
}))

function Resign() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickBtn = () => {
        if(window.confirm('정말로 탈퇴하시겠습니까?')){
            dispatch(resignUser(window.prompt('탈퇴를 위한 아이디의 비밀번호를 입력해주시기 바랍니다.')))
            .then(res => {
                if(res.data.success){
                    alert(res.data.message);
                    localStorage.removeItem('access');
                    return history.push('/');
                }
                return alert(res.data.message);
            })
        }
    };
    return (
        <Box className={classes.area}>
            <Box className={classes.textArea}>
                <Typography className={classes.text} variant='body1'>
                    그 동안 이용해주셔서 감사합니다.<br />
                    좋은 하루 보내시길 바랍니다.
                </Typography>
            </Box>
            <Button variant="outlined" onClick={onClickBtn}>탈퇴하기</Button>
        </Box>
    )
}

export default Resign
