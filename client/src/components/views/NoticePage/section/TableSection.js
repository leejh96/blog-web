import React, { useState, useEffect } from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import Loading from '../../LoadingPage/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
const Number = styled(TableCell)`
    text-align : center;
    width : 10%;
`;
const Title = styled(TableCell)`
    text-align : center;
    width : 50%;

`;
const Author = styled(TableCell)`
    text-align : center;
    width : 20%;
`;
const Date = styled(TableCell)`
    text-align : center;
    width : 20%;
`;

const TableLink = styled(Link)`
    text-decoration : none;
    color : black;
    &:hover{
        color : #999999;
        text-decoration: underline;
    }
`;
function TableSection() {
    const page = useParams().page;
    const dispatch = useDispatch();
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(false);
    const searchNotice = useSelector(state => state.NoticeReducer.searchNotices);
    useEffect(() => {
        console.log(1);
        setLoad(true);
        dispatch(loadNotice())
        .then(res => {
            setPost(res.data.slice((page-1)*10, page*10 -1));
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
            <Table style={{ marginBottom : '30px'}}>
                <TableHead>
                    <TableRow>
                        <Number>번호</Number>
                        <Title>제목</Title>
                        <Author>작성자</Author>
                        <Date>작성일</Date>
                    </TableRow>
                </TableHead>
                <TableBody>
                {post.map((val, i) => (
                    <TableRow key={i}>
                        <Number>{i+1}</Number>
                        <Title><TableLink to={`/notice/${page}/${val._id}`}>{val.title}</TableLink></Title>
                        <Author>{val.author.nick}</Author>
                        <Date>{val.date}</Date>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            }
        </>
    )
}

export default TableSection
