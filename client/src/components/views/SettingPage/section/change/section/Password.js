import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { changePassword } from '../../../../../../actions/UserAction';

const ChangeText = styled(TextField)`
    width : 100%;
`;
const PasswordDiv = styled.div`
    margin-bottom : 30px;
`;
const BtnArea = styled.div`
    margin-top : 50px;
    display : flex;
    justify-content : space-around;
`;
function Password() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitChange = (e) => {
        e.preventDefault();
        if(password !== confirm){
            return alert('비밀번호를 확인해주세요');
        }
        dispatch(changePassword(password))
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
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordConfirm = (e) => {
        setConfirm(e.target.value);
    };
    return (
        <form onSubmit={onSubmitChange}>
            <PasswordDiv>
                <ChangeText type='password' variant='outlined' onChange={onChangePassword} placeholder='변경할 비밀번호를 입력하세요' required autoComplete='false'/>
            </PasswordDiv>
            <ChangeText type='password' variant='outlined' onChange={onChangePasswordConfirm} placeholder='비밀번호를 한번 더 입력하세요' required autoComplete='false'/>
            <BtnArea>
                <Button type='submit' variant='outlined'>변경</Button>
                <Button variant='outlined' onClick={onClickCancel}>취소</Button>
            </BtnArea>
        </form>
    )
}

export default Password
