import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Button} from '@material-ui/core';
import { loadStudyComment, deleteStudyComment } from '../../../../actions/StudyAction';

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
    const leng = useSelector(state => state.StudyReducer.commentLength);
    const { study } = useParams();
    const user = useSelector(state => state.UserReducer.user);
    
    useEffect(() => {
        dispatch(loadStudyComment(study))
        .then(res => {
            setComment(res.data);
        })
    },[dispatch, study, leng])

    const onClickDelete = (commentId, study) => {
        dispatch(deleteStudyComment(commentId, study))
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
                                    <DeleteBtn onClick={() => onClickDelete(val._id, study)}>X</DeleteBtn>
                                :
                                    <></>
                            :
                                user.role === 3 ?
                                    <DeleteBtn onClick={() => onClickDelete(val._id, study)}>X</DeleteBtn>
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
