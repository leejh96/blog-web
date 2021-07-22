import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';

const NoticeArea = styled.div`
    border: 1px solid black;
    width : 40%;
    height : 500px;
    border-radius : 25px 25px 25px 25px;
    box-shadow : 5px 5px 5px rgba(0,0,0,0.3);
`;

const NoticeTitle = styled.h2`
    margin : 0;
    padding : 30px 0 30px 0;
    text-align : center;
    border-bottom : 1px solid #eeeeee;
`;

const Post = styled.div`
    display : flex;
    padding : 12px;
    justify-content : space-between;
    font-size : 1.25rem;

`;

const PostLink = styled(Link)`
    text-decoration : none;
    color : black;
    margin-bottom : 5px;
    &:hover{
        color : #999999;
    };
`;

function Notice() {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state =>  state.UserReducer.user);
    useEffect(() => {
        dispatch(loadNotice())
        .then(res => {
            setPosts(res.data.slice(0,7));
        })
    },[dispatch])
    return (
        <NoticeArea>
            <NoticeTitle>공지사항</NoticeTitle>
            {posts.map((val, i) => (
                <Post key={i}>
                    <div>{i+1}</div>
                    <PostLink to={user._id ? `/notice/1/${val._id}` : '/login'}  >{val.title}</PostLink>
                    <div>{val.author ? val.author.nick : '알수없음'}</div>
                </Post>
            ))}
        </NoticeArea>
    )
}

export default Notice
