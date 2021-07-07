import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addLike, deleteLike } from '../../../../../actions/NoticeAction';
import { loadLike } from '../../../../../actions/NoticeAction';
const OnToggleBtn = styled(Button)`
    background-color : blue;
    color : white;
    &:hover{
        background-color : #87cefa;
    }
`;

const LikeBtnDiv = styled.div`
    margin-bottom : 20px;
    text-align : center;
`;

function LikeButton() {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState(0);
    const [toggle, setToggle] = useState(0);

    useEffect(() => {
        dispatch(loadLike(id))
        .then(res => {
            setCnt(res.like.length);
            res.like.includes(res.user) ? setToggle(1) : setToggle(0);
        })
    },[dispatch, toggle, id])

    const onClickLike = () => {
        if(toggle === 0){
            dispatch(addLike(id))
            .then(res => {
                setCnt(res.data.length);
                setToggle(1);
            })
        }else{
            dispatch(deleteLike(id))
            .then(res => {
                setCnt(res.data.length);
                setToggle(0);
            })
        }
    };

    return (
        <LikeBtnDiv>
            { 
                toggle ? 
                <OnToggleBtn variant='contained' onClick={onClickLike}>{`좋아요 ${cnt}`}</OnToggleBtn>
                :
                <Button variant='contained' onClick={onClickLike}>{`좋아요 ${cnt}`}</Button>
            }
        </LikeBtnDiv>
    )
}

export default LikeButton
