import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { loadStudyComment, deleteStudyComment } from '../../../../actions/StudyAction';

const useStyles = makeStyles({
    deleteButton : {
        height: '100%',
        minWidth : 0,
        color : '#5e669c',
        lineHeight : 0,
    }
})

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
const Img = styled.img`
    margin-right : 10px;
    width : 5%;
`;
const Info = styled.div`
    display : flex;
    align-items : center;
`;

const DateAndBtn = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
`;
function CommentTable() {
    const classes = useStyles();
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

    const onClickDelete = (commentId, study) => () => {
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
                        <Info>
                            { val.user.img ? 
                                <Img src={`/api/img/${val.user.img}`} alt='userImg'/>
                            :
                                <Img src={'/api/img/basic.png'} alt='userImg'/>
                            }
                            { val.user ? val.user.nick : '알수없음' }
                        </Info>
                        <DateAndBtn>
                            <div align='center'>
                                {val.date}
                            </div>
                            <div align='center'>
                                {val.user ?
                                    user._id === val.user._id || user.role === 3 ?
                                        <Button className={classes.deleteButton} onClick={onClickDelete(val._id, study)}>X</Button>
                                    :
                                        <></>
                                :
                                    user.role === 3 ?
                                        <Button className={classes.deleteButton} onClick={onClickDelete(val._id, study)}>X</Button>
                                    :
                                        <></>
                                }
                            </div>
                        </DateAndBtn>
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