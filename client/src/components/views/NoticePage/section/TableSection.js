import React from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const TableValue = styled(TableCell)`
    text-align : center;
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
    const posts = [
        {
            title : '안녕하세요',
            author : '관리자',
            date : '20201-06-09',
        },
        {
            title : '어서오세요',
            author : '관리자',
            date : '20201-06-10',
        },
        {
            title : '또 오세요',
            author : '관리자',
            date : '20201-06-11',
        },
        {
            title : '조심히 가세요',
            author : '관리자',
            date : '20201-06-12',
        }
        ,        {
            title : '다시 오세요',
            author : '관리자',
            date : '20201-06-13',
        }
    ]
    return (
        <Table style={{ marginBottom : '30px'}}>
            <TableHead>
                <TableRow>
                    <TableValue>번호</TableValue>
                    <TableValue>제목</TableValue>
                    <TableValue>작성자</TableValue>
                    <TableValue>작성일</TableValue>
                </TableRow>
            </TableHead>
            <TableBody>
            {posts.map((val, i) => (
                <TableRow>
                    <TableValue>{i+1}</TableValue>
                    <TableValue><TableLink>{val.title}</TableLink></TableValue>
                    <TableValue>{val.author}</TableValue>
                    <TableValue>{val.date}</TableValue>
                </TableRow>
            ))}

            </TableBody>
        </Table>
    )
}

export default TableSection
