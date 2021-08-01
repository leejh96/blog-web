import React, { useState, useEffect } from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import Loading from '../../LoadingPage/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
const Number = styled(TableCell)`
    // width : 10%;
`;
const Title = styled(TableCell)`
    // width : 50%;
`;
const Author = styled(TableCell)`
    // width : 20%;
`;
const Date = styled(TableCell)`
    // width : 20%;
`;

const TableLink = styled(Link)`
    text-decoration : none;
    color : black;
    &:hover{
        color : #999999;
        text-decoration: underline;
    }
`;

const TABLE = styled(Table)`
    margin-bottom : 30px;
`;

function TableSection() {
    const page = useParams().page;
    const dispatch = useDispatch();
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(false);
    const searchNotice = useSelector(state => state.NoticeReducer.searchNotices);
    const user = useSelector(state => state.UserReducer.user);
    
    useEffect(() => {
        setLoad(true);
        dispatch(loadNotice())
        .then(res => {
            setPost(res.data.slice((page-1)*10, page*10));
            setLoad(false);
        })
    }, [dispatch, page])

    useEffect(() => {
        setPost(searchNotice);
    },[searchNotice])
    return (
        <>
            {load ?
            <Loading />
            :
            <TABLE>
                <TableHead>
                    <TableRow>
                        <Number align='center'>번호</Number>
                        <Title align='center'>제목</Title>
                        <Author align='center'>작성자</Author>
                        <Date align='center'>작성일</Date>
                    </TableRow>
                </TableHead>
                <TableBody>
                {post.map((val, i) => (
                    <TableRow key={val._id}>
                        <Number align='center'>{(page-1)*10 + (i+1)}</Number>
                        <Title align='center'><TableLink to={user._id ? `/notice/${page}/${val._id}` : `/login`}>{val.title}</TableLink></Title>
                        <Author align='center'>{val.author ? val.author.nick : '알수없음'}</Author>
                        <Date align='center'>{val.date}</Date>
                    </TableRow>
                ))}
                </TableBody>
            </TABLE>
            }
        </>
    )
}

export default TableSection
