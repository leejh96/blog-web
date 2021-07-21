import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resignUser } from '../../../../../../actions/UserAction';
import { useHistory } from 'react-router-dom';
const Text = styled.div`
    font-size : 2rem;
`;
const ResignDiv = styled.div`
    display : flex;
    flex-direction: column;
    align-items : center;
`;
function Resign() {
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickBtn = () => {
        if(window.confirm('정말로 탈퇴하시겠습니까?')){
            dispatch(resignUser(window.prompt('탈퇴를 위한 아이디의 비밀번호를 입력해주시기 바랍니다.')))
            .then(res => {
                if(res.data.success){
                    alert(res.data.message);
                    localStorage.removeItem('access');
                    return history.push('/');
                }
                return alert(res.data.message);
            })
        }
    };
    return (
        <ResignDiv>
            <Text>
                <p>그 동안 이용해주셔서 감사합니다.<br />
                좋은 하루 보내시길 바랍니다.</p>
            </Text>
            <Button variant="outlined" onClick={onClickBtn}>탈퇴하기</Button>
        </ResignDiv>
    )
}

export default Resign
