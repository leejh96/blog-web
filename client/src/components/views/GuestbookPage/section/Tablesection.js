import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core'
import styled from 'styled-components';
import axios from 'axios';
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
    const [guest, setGuest] = useState([]);
    useEffect(() => {
        axios.get('/api/guestbook/')
        .then(res => {
            if(res.data.success){
                return setGuest((prev) => { return [...prev, res.data.guests] });
            }
            return alert(res.data.message);
        })
    }, [])

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
                        {console.log(guest)}
                        {guest.map((val, idx) => (
                            <TableRow key={idx}>
                                <Nick>{val[idx].writer}</Nick>
                                <Content>{val[idx].text}</Content>
                                <Time>{val[idx].createdAt}</Time>
                            </TableRow> 
                        ))}
                </TableBody>
            </Table>
        </TableArea>
    )
}

export default Tablesection
