import React, { useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { changeNick } from '../../../../../../actions/UserAction';
const Nickname = styled.div`
    box-sizing : border-box;
    border : 1px solid #c4c4c4;
    height : 60px;
    font-size : 1.5rem;
    padding : 10px;
    border-radius : 5px;
    margin-bottom : 30px;
`;

const ChangeText = styled(TextField)`
    width : 100%;
    margin-bottom : 50px;
`;

const BtnArea = styled.div`
    display : flex;
    justify-content : space-around;
`;
function Nick() {
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const history = useHistory();
    const [nick, setNick] = useState(user.nick);
    const dispatch = useDispatch();

    const onSubmitChange = (e) => {
        e.preventDefault();
        if(nick === text){
            return alert('기존 닉네임과 같습니다');
        }
        dispatch(changeNick(text))
        .then(res => {
            if(res.data.success){
                alert(res.data.message);
                return history.push('/setting');
            }
            return alert(res.data.message);
        })
    }
    const onClickCancel = () => {
        return history.push('/setting');
    }
    const onChangeNick = (e) => {
        setText(e.target.value);
    };
    return (
        <form onSubmit={onSubmitChange}>
            <Nickname>{user.nick}</Nickname>
            <ChangeText variant='outlined' onChange={onChangeNick} placeholder='변경할 닉네임을 입력하세요' required/>
            <BtnArea>
                <Button type='submit' variant='outlined'>변경</Button>
                <Button variant='outlined' onClick={onClickCancel}>취소</Button>
            </BtnArea>
        </form>
    )
}

export default Nick
