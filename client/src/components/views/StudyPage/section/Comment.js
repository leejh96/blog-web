import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { createStudyComment } from '../../../../actions/StudyAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        justifyContent : 'space-between',
        paddingBottom : '10px',
    },
    text : {
        width : '90%'
    }
}))

function Comment() {
    const classes = useStyles();
    const user = useSelector(state => state.UserReducer.user);
    const dispatch = useDispatch();
    const { study } = useParams();
    const [comment, setComment] = useState('');
    const history = useHistory();

    const onClickBtn = () => {
        const data = {
            comment,
            study,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if(user._id){
            return dispatch(createStudyComment(data))
            .then(setComment(''));
        }
        alert('로그인이 필요합니다');
        return history.push('/login');
    }
    const onChangeText = (e) => {
        setComment(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} multiline={true} placeholder="댓글을 남겨보세요" onChange={onChangeText} variant="outlined" required/>
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Comment
