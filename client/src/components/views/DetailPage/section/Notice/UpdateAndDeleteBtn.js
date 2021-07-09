import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotice } from '../../../../../actions/NoticeAction';

const ButtonDiv = styled.div`
    display : flex;
    justify-content : space-evenly;
    margin-bottom : 40px;
`;

const BtnLink = styled(Link)`
    text-decoration : none;
    color : black;

`;



function UpdateAndDeleteBtn() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickDelete = (id) => {
        dispatch(deleteNotice(id))
        .then(res => {
            if(res.data){
                history.push('/notice/1');
            }
        })
    }
    return (
        <ButtonDiv>
            <BtnLink to={`/notice/${id}/edit`}><Button variant='outlined'>수정</Button></BtnLink>
            <Button variant='outlined' onClick={() => onClickDelete(id)}>삭제</Button>
        </ButtonDiv>
    )
}

export default UpdateAndDeleteBtn
