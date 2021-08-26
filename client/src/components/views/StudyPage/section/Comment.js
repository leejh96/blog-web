import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { createStudyComment } from '../../../../actions/StudyAction';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_STUDY_COMMENT, CREATE_STUDY_COMMENT_ERROR, SERVER_ERROR, AUTH_ERROR } from '../../../../actions/type';

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
        if(!comment){
            return alert('댓글을 입력하세요');
        }
        const data = {
            comment,
            study,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if(user._id){
            dispatch(createStudyComment(data))
            .then(res => {
                if(res.type === CREATE_STUDY_COMMENT){
                    document.querySelector('#comment').value = '';
                    return setComment('')
                }
                if(res.type === CREATE_STUDY_COMMENT_ERROR){
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
        }else{
            alert('로그인이 필요합니다');
            return history.push('/login');
        }
    }
    const onChangeText = (e) => {
        setComment(e.target.value);
    };
    return (
        <Box className={classes.area}>
            <TextField className={classes.text} multiline={true} placeholder="댓글을 남겨보세요" onChange={onChangeText} variant="outlined" id='comment'/>
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </Box>
    )
}

export default Comment
