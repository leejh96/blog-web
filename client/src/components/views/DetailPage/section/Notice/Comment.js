import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createNoticeComment } from '../../../../../actions/NoticeAction';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

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
    const [comment, setComment] = useState('');
    const onClickBtn = () => {
        const data = {
            comment,
            id,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(createNoticeComment(data))
    }
    const onChangeText = (e) => {
        setComment(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} multiline={true} placeholder="댓글을 남겨보세요" onChange={onChangeText} variant="outlined" />
            <Button size='small' variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Comment
