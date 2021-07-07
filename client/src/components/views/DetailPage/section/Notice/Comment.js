import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createNoticeComment } from '../../../../../actions/NoticeAction';
import moment from 'moment';

const CommentBox = styled.div`
    display : flex;
    justify-content : space-between;
    padding-bottom : 10px;
`;
const TextBox = styled(TextField)`
    width : 90%
`;
function Comment() {
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
        .then( console.log(1111));
    }
    const onChangeText = (e) => {
        setComment(e.target.value);
    };
    return (
        <CommentBox>
            <TextBox multiline={true} placeholder="댓글을 남겨보세요" onChange={onChangeText} variant="outlined" />
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </CommentBox>
    )
}

export default Comment
