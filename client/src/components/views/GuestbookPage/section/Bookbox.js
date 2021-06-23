import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from  'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
const BookboxDiv = styled.div`
    display : flex;
    justify-content : space-between;
    padding-bottom : 10px;
`;
const TextBox = styled(TextField)`
    width : 90%
`;

function Bookbox() {
    const history = useHistory();
    const [text, setText] = useState('');
    const onClickBtn = () => {
        axios.post('/api/guestbook/', {
            date: moment().format("YYYY-MM-DD hh:mm:ss"),
            text
        })
        .then(res => {
            if(res.data.success){
                return ;
            }
            return alert(res.data.message);
        })
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
