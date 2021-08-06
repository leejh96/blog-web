import { Button, TextField, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createGuestBook } from '../../../../actions/GuestbookAction';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        justifyContent : 'space-between',
        paddingBottom : '10px',
    },
    text : {
        width : '90%',
    }
}))


function Bookbox() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const history = useHistory();

    const onClickBtn = (e) => {
        const data = {
            text,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if(user._id){
            dispatch(createGuestBook(data))
            .then(history.push('/guestbook/1'))
        }else{
            alert('로그인이 필요합니다');
            return history.push('/login');
        }
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} placeholder="방명록을 남겨보세요." onChange={onChangeText} variant="outlined" />
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Bookbox
