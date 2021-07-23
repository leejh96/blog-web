import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createGuestBook } from '../../../../actions/GuestbookAction';
import { useHistory } from 'react-router-dom';
const BookboxDiv = styled.div`
    display : flex;
    justify-content : space-between;
    padding-bottom : 10px;
`;
const TextBox = styled(TextField)`
    width : 90%
`;

function Bookbox() {
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
        }else{
            alert('로그인이 필요합니다');
            return history.push('/login');
        }
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    return (
        <BookboxDiv>
            <TextBox placeholder="방명록을 남겨보세요." onChange={onChangeText} variant="outlined" />
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </BookboxDiv>
    )
}

export default Bookbox
