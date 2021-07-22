import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { loadComment, deleteNoticeComment } from '../../../../../actions/NoticeAction';
import { useParams } from 'react-router-dom';
import {Button} from '@material-ui/core';

const CommentDiv = styled.div`
    width : 70%;
    border : 1px solid #c4c4c4;
    border-radius : 3px;
    margin-bottom : 20px;
`;
const UserInfo = styled.div`
    display : flex;
    justify-content : space-between;
    border-bottom : 1px solid #c4c4c4;
    background-color : #f6f8fa;
    color : #5e666f;
    padding : 10px 20px;
`;
const Comment = styled.div`
    padding : 10px 20px;
    word-break:break-all;
`;

const DIV = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column
`;
const DeleteBtn = styled(Button)`
    line-height : 0;
    min-width : 0;
    color : #5e669c;
`;

function CommentTable() {
    const dispatch = useDispatch();
    const [comment, setComment] = useState([]);
    const leng = useSelector(state => state.NoticeReducer.commentLength);
    const id = useParams().id;
    const user = useSelector(state => state.UserReducer.user);
    useEffect(() => {
        dispatch(loadComment(id))
        .then(res => {
            setComment(res.data);
        })
    },[dispatch, id, leng])

    const onClickDelete = (commentId, noticeId) => {
        dispatch(deleteNoticeComment(commentId, noticeId))
        .then(res => {
            setComment(res.data);
        })
    };
    return (
        <DIV>
            { comment.map((val, idx) => (
                <CommentDiv key={val._id}>
                    <UserInfo>
                        <div>
                            { val.user ? val.user.nick : '알수없음' }
                        </div>
                        <div>
                            {val.date}
                            {val.user ?
                                user._id === val.user._id || user.role === 3 ?
                                    <DeleteBtn onClick={() => onClickDelete(val._id, id)}>X</DeleteBtn>
                                :
                                    <></>
                            :
                                user.role === 3 ?
                                    <DeleteBtn onClick={() => onClickDelete(val._id, id)}>X</DeleteBtn>
                                :
                                    <></>
                            }
                        </div>
                    </UserInfo>
                    <Comment>
                        {val.comment.split('\n').map((value, index) => (
                            <span key={index}>{value}<br/></span>
                        ))}
                    </Comment>
                </CommentDiv>
            )) }
        </DIV>
    )
}

export default CommentTable
