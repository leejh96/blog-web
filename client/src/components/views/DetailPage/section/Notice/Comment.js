import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createNoticeComment } from '../../../../../actions/NoticeAction';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, CREATE_NOTICE_COMMENT, CREATE_NOTICE_COMMENT_ERROR, SERVER_ERROR } from '../../../../../actions/type';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            justifyContent : 'space-between',
            paddingBottom : '10px',
        },
        text : {
            width : '90%',
        }
    }
})

function Comment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = useParams().id;
    const history = useHistory();
    const [comment, setComment] = useState('');
    const onClickBtn = () => {
        if (comment === ''){
            return alert('댓글을 입력하세요');
        }
        const data = {
            comment,
            id,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(createNoticeComment(data))
        .then(res => {
            if(res.type === CREATE_NOTICE_COMMENT){
                document.querySelector('#comment').value = '';
                return setComment('')
            }
            if(res.type === CREATE_NOTICE_COMMENT_ERROR){
                return alert(res.data.message);
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login');
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        });
    }
    const onChangeText = (e) => {
        setComment(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} multiline={true} placeholder="댓글을 남겨보세요" onChange={onChangeText} variant="outlined" id='comment'/>
            <Button size='small' variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Comment
