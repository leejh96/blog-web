import { Button, TextField, Box } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createGuestBook } from '../../../../actions/GuestbookAction';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, CREATE_GUESTBOOK, CREATE_GUESTBOOK_ERROR, SERVER_ERROR } from '../../../../actions/type';

const useStyles = makeStyles(theme => ({
    area: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '10px',
    },
    text: {
        width: '90%',
    }
}))


function Bookbox() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const history = useHistory();
    const textRef = useRef(null);
    const onClickBtn = () => {
        const data = {
            text,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if (user._id) {
            dispatch(createGuestBook(data))
                .then(res => {
                    if (res.type === CREATE_GUESTBOOK) {
                        setText('');
                        return textRef.current.focus();
                    }
                    if (res.type === CREATE_GUESTBOOK_ERROR) {
                        alert(res.data.message);
                        setText('');
                        return textRef.current.focus();
                    }
                    if (res.type === AUTH_ERROR) {
                        alert(res.data.message);
                        return history.push('/login');
                    }
                    if (res.type === SERVER_ERROR) {
                        return history.push('/error/500');
                    }
                })
        } else {
            alert('로그인이 필요합니다');
            return history.push('/login');
        }
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} inputRef={textRef} placeholder="방명록을 남겨보세요." autoFocus onChange={onChangeText} variant="outlined" value={text} />
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Bookbox
