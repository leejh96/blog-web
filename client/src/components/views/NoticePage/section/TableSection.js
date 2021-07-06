import React, { useState, useEffect } from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Loading from '../../LoadingPage/Loading';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setLoad(true);
        dispatch(loadNotice())
        .then(res => {
            setPost(res.data);
            setLoad(false);
        })
    }, [dispatch])
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
                        <Title><TableLink to={`/notice/${val._id}`}>{val.title}</TableLink></Title>
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
