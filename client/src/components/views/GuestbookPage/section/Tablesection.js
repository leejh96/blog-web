import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core'
import styled from 'styled-components';

const Nick = styled(TableCell)`
    width : 15%;
    text-align : center;
`;

const Content = styled(TableCell)`
    width : 70%;
    text-align : center;

`;

const Time = styled(TableCell)`
    width : 15%;
    text-align : center;

`;

const TableArea = styled.div`
    margin-bottom : 20px;
`;
function Tablesection() {
    const guest = [
        {
            nick : '웹린이',
            content : '안녕하세요',
            time : '2021-06-14'
        },
        {
            nick : '웹고수',
            content : '출첵합니다',
            time : '2021-06-15'
        },
        {
            nick : '지나가던행인',
            content : '좋은 블로그네요',
            time : '2021-06-16'
        }
    ]
    
    return (
        <TableArea>
            <Table>
                <TableHead>
                    <TableRow>
                        <Nick>닉네임</Nick>
                        <Content>내용</Content>
                        <Time>시간</Time>
                    </TableRow>    
                </TableHead>
                <TableBody>
                        {guest.map((val, idx) => (
                            <TableRow key={idx}>
                                <Nick>{val.nick}</Nick>
                                <Content>{val.content}</Content>
                                <Time>{val.time}</Time>
                            </TableRow> 
                        ))}
                </TableBody>
            </Table>
        </TableArea>
    )
}

export default Tablesection
