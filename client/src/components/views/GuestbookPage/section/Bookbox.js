import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { createGuestBook } from '../../../../actions/GuestbookAction';
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
    const onClickBtn = () => {
        const data = {
            text,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(createGuestBook(data))
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    return (
        <BookboxDiv>
            <TextBox multiline={true} placeholder="방명록을 남겨보세요." onChange={onChangeText} variant="outlined" />
            <Button variant="contained" onClick={onClickBtn}>등록</Button>
        </BookboxDiv>
    )
}

export default Bookbox
