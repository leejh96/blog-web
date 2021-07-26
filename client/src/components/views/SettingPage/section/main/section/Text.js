import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Button, TextField } from '@material-ui/core';
import { updateMotto } from '../../../../../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
const TextContent = styled.div`
    text-align : center;
    padding : 15% 0 5% 0;
    font-size : 3rem;
    margin-bottom : 20px;
`;
const TextInput = styled(TextField)`
    margin-bottom : 20px;
`;
const Btn = styled(Button)`
    margin-bottom : 20px;
`;
function Text() {
    const user = useSelector(state => state.UserReducer.user);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setText(user.motto);
    }, [user.motto]);

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onSubmitText = (e) => {
        e.preventDefault();
        if(!toggle){
            return setToggle(true);
        }
        dispatch(updateMotto(text))
        .then(res => {
            if(!res.data.success){
                alert(res.data.message);
            }
            return setToggle((tog) => (!tog));
        })
    }
    return (
        <>
            <TextContent>
                {text ? text.split('\n').map((txt, idx) => (
                    <span key={txt+idx}>{txt}<br /></span>
                ))
                : '적고싶은 글귀나 명언을 입력하세요!'}
            </TextContent>
            <form onSubmit={onSubmitText}>
                <div align='center'>
                    {toggle ? <TextInput variant='outlined' fullWidth multiline onChange={onChangeText}/> : <></>}
                    <Btn type='submit'  variant='outlined'>{ toggle ? '저장' : '입력'}</Btn>
                </div>
            </form>
        </>
    )
}

export default Text
