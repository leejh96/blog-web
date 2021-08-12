import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { changePassword } from '../../../../../../actions/UserAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    password : {
        marginBottom : '32px'
    },
    btnArea : {
        marginTop : '50px',
        display : 'flex',
        justifyContent : 'space-around',
    },
    msg : {
        textAlign :'center',
        margin : '450px 0',
        fontSize : '3rem'
    }
}))

function Password() {
    const user = useSelector(state => state.UserReducer.user);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const onSubmitChange = (e) => {
        e.preventDefault();
        if(password !== confirm){
            return alert('비밀번호를 확인해주세요');
        }
        dispatch(changePassword(password))
        .then(res => {
            if(res.data.success){
                alert(res.data.message);
                return history.push('/setting');
            }
            return alert(res.data.message);
        })

    }
    const onClickCancel = () => {
        return history.push('/setting');
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordConfirm = (e) => {
        setConfirm(e.target.value);
    };
    return (
        <>
            { 
                user.provider === 'local' ?
                <form onSubmit={onSubmitChange}>
                    <Box>
                        <TextField className={classes.password}type='password' variant='outlined' onChange={onChangePassword} placeholder='변경할 비밀번호를 입력하세요' required autoComplete='false' fullWidth/>
                        <TextField type='password' variant='outlined' onChange={onChangePasswordConfirm} placeholder='비밀번호를 한번 더 입력하세요' required autoComplete='false' fullWidth/>
                    </Box>
                    <Box className={classes.btnArea}>
                        <Button type='submit' variant='outlined'>변경</Button>
                        <Button variant='outlined' onClick={onClickCancel}>취소</Button>
                    </Box>
                </form>
            :
                <Box className={classes.msg}>
                    비밀번호 변경이 가능한 아이디가 아닙니다.
                </Box>
            }
        </>
    )
}

export default Password
