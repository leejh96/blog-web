import React, { useState } from 'react'
import { TextField, Box, Button, Typography, SvgIcon} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { findPassword } from '../../../../actions/UserAction';
import { useHistory } from 'react-router-dom';
import { FIND_PASSWORD, NOT_FIND_PASSWORD, SERVER_ERROR } from '../../../../actions/type';
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

function Input() {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const onSubmitData = (e) => {
        e.preventDefault();
        dispatch(findPassword(name, email))
        .then(res => {
            if(res.type === FIND_PASSWORD){
                return history.push('/newPassword', {
                    userId : res.data.user
                })
            }
            if(res.type === NOT_FIND_PASSWORD){
                return alert(res.data.message);
            }
            if(res.type === SERVER_ERROR){
                history.push('/error/500');
            }
        })
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onClickClose = () => {
        history.push('/login')
    }
    return (
        <Box>
            <Box className={classes.title}>
                <SvgIcon className={classes.icon}><AccountCircleIcon /></SvgIcon>
                <Typography variant='h4'>비밀번호 찾기</Typography>
            </Box>
            <form onSubmit={onSubmitData} className={classes.form}>
                <Box className={classes.input}>
                    <TextField type='email' name='email' onChange={onChangeEmail} className={classes.text} fullWidth label='이메일' variant='outlined' required/>
                    <TextField name='username' onChange={onChangeName} fullWidth label='이름' variant='outlined' required/>
                </Box>
                <Box className={classes.btnArea}>
                    <Button type='submit' color='primary' variant='contained'>찾기</Button>
                    <Button onClick={onClickClose} variant='outlined'>닫기</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Input
