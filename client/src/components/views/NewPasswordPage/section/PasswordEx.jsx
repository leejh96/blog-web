import React, { useState, useEffect, useRef } from 'react'
import { Box, SvgIcon, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPassword } from '../../../../actions/UserAction';
import { NEW_PASSWORD, NEW_PASSWORD_FAIL, SERVER_ERROR } from '../../../../actions/type';

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
    const [input, setInput] = useState({
        password : '',
        confirm : '',
    })
    const { password, confirm } = input
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
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
                alert('비밀번호가 일치하지 않습니다');
                setInput({
                    ...input,
                    confirm : '',
                })
                return confirmRef.current.focus();
            }
            dispatch(newPassword(password, location.state.userId))
            .then(res => {
                if(res.type === NEW_PASSWORD){
                    return history.push('/login')
                }
                if(res.type === NEW_PASSWORD_FAIL){
                    alert(res.data.message);
                    setInput({
                        password : '',
                        confirm : '',
                    })
                    return passwordRef.current.focus();
                }
                if(res.type === SERVER_ERROR){
                    return history.push('/error/500');
                }
            })
        }else{
            return alert('비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다')
        }
    }

    const onClickClose = () => {
        history.push('/login');
    }
    const onChangeInput =(e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })       
    }
    return (
        <Box className={classes.area}>
            <Box className={classes.title}>
                <SvgIcon className={classes.icon}><AccountCircleIcon /></SvgIcon>
                <Typography variant='h4'>새로운 비밀번호</Typography>
            </Box>
            <form onSubmit={onSubmitData} className={classes.form}>
                <Box className={classes.input}>
                    <TextField 
                        type='password' 
                        name='password' 
                        onChange={onChangeInput} 
                        className={classes.text} 
                        fullWidth 
                        label='비밀번호' 
                        variant='outlined' 
                        required
                        inputRef={passwordRef}
                        value = {password}
                    />
                    <TextField 
                        type='password'
                        name='confirm' 
                        onChange={onChangeInput} 
                        fullWidth 
                        label='비밀번호 확인' 
                        variant='outlined' 
                        required
                        inputRef={confirmRef}
                        value = {confirm}
                    />
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
