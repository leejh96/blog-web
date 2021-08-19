import React, { useState, useEffect } from 'react'
import { Box, SvgIcon, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPassword } from '../../../../actions/UserAction';

const useStyles = makeStyles(theme => ({
    form : {
        display : 'flex',
        flexDirection : 'column'
    },
    icon : {
        fontSize : '48px',
    },
    title : {
        display : 'flex',
        flexDirection : 'column',
        alignItems :'center',
        marginBottom : '24px'
    },
    input : {
        marginBottom : '24px',
    },
    text : {
        paddingBottom : '12px'
    },
    btnArea : {
        display : 'flex',
        justifyContent : 'space-evenly'
    }
}))

const checkPassword = password => {
    const blank = /\s/
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if(!blank.test(password)){
        if(regex.test(password)){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

function Password() {
    const location = useLocation();
    const classes = useStyles();
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();

    //메인페이지에서 바로 비밀번호를 입력하는곳으로 가는 걸 막기위함
    useEffect(() => {
        if(!location.state){
            history.push('/login');
        }
    },[history, location.state])

    const onSubmitData = (e) => {
        e.preventDefault();
        if(checkPassword(password)){
            if(password !== confirm){
                return alert('비밀번호가 일치하지 않습니다');
            }
            dispatch(newPassword(password, location.state.userId))
            .then(res => {
                if(res.data.success){
                    return history.push('/login')
                }
                return alert(res.data.message);
            })
        }else{
            return alert('비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다')
        }
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirm = (e) => {
        setConfirm(e.target.value);
    }

    const onClickClose = () => {
        history.push('/login');
    }
    
    return (
        <Box className={classes.area}>
            <Box className={classes.title}>
                <SvgIcon className={classes.icon}><AccountCircleIcon /></SvgIcon>
                <Typography variant='h4'>새로운 비밀번호</Typography>
            </Box>
            <form onSubmit={onSubmitData} className={classes.form}>
                <Box className={classes.input}>
                    <TextField type='password' onChange={onChangePassword} className={classes.text} fullWidth label='비밀번호' variant='outlined' autoComplete='off' required/>
                    <TextField type='password' onChange={onChangeConfirm} fullWidth label='비밀번호 확인' variant='outlined' required autoComplete='off'/>
                </Box>
                <Box className={classes.btnArea}>
                    <Button type='submit' color='primary' variant='contained'>변경</Button>
                    <Button onClick={onClickClose} variant='outlined'>닫기</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Password
