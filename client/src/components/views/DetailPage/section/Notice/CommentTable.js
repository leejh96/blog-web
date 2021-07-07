import React, {useState, useEffect} from 'react'
import {TextField} from '@material-ui/core'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';


const CommentDiv = styled.div`
    width : 70%;
    border : 1px solid #c4c4c4;
    border-radius : 3px;
    margin-bottom : 20px;
`;
const UserInfo = styled.div`
    border-bottom : 1px solid #c4c4c4;
    background-color : #f6f8fa;
    color : #5e666f;
    padding : 10px 20px;
`;
const Comment = styled.div`
    padding : 10px 20px;
    word-wrap: break-word;
`;
const Text = styled.textarea`
    &:disabled{
        background-color : white;
    }
    resize: none;
    border : none;
    width : 100%;
    height : 100%;
    overflow:visible;
`;

const DIV = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column
`;

function CommentTable() {


    return (
        <DIV>
            <CommentDiv>
                <UserInfo>
                    username, 코멘트시간
                </UserInfo>
                <Comment>
                </Comment>
            </CommentDiv>
        </DIV>
    )
}

export default CommentTable
