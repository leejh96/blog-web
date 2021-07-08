import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { loadComment } from '../../../../../actions/NoticeAction';
import { useParams } from 'react-router-dom';
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
    word-break:break-all;
`;

const DIV = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column
`;

function CommentTable() {
    const dispatch = useDispatch();
    const [comment, setComment] = useState([]);
    const leng = useSelector(state => state.NoticeReducer.commentLength);
    const id = useParams().id;
    useEffect(() => {
        dispatch(loadComment(id))
        .then(res => {
            setComment(res.data);
        })
    },[dispatch, id, leng])
    return (
        <DIV>
            { comment.map((val, idx) => (
                <CommentDiv key={idx}>
                    <UserInfo>
                        {val.user.nick} {val.date}
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
