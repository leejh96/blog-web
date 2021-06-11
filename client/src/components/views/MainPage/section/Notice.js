import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

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
    padding : 10px;
    flex-direction : column;
`;

const PostLink = styled(Link)`
    text-decoration : none;
    font-size : 1.5rem;
    color : black;
    margin-bottom : 5px;
    &:hover{
        color : #999999;
    };
`;

function Notice() {
    const posts = [
        {
            tag : 'title',
            link : '#',
        },
        {
            tag : 'title2',
            link : '#',
        },
        {
            tag : 'title3',
            link : '#',
        }
    ]
    return (
        <NoticeArea>
            <NoticeTitle>공지사항</NoticeTitle>
            <Post>
                {posts.map((val, i) => (
                    <PostLink key={i} to={val.link} color="inherit" >{val.tag}</PostLink>
                ))}
            </Post>
            

        </NoticeArea>
    )
}

export default Notice