import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
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
const Delete = styled(TableCell)`
    width : auto;
    $:hover {
        display : inline;
    }
`;
const TableArea = styled.div`
    margin-bottom : 20px;

`;

function Tablesection() {
    const [guest, setGuest] = useState([]);
    useEffect(() => {
        console.log(1);
        axios.get('/api/guestbook/')
        .then(res => {
            if(res.data.success){
                setGuest((prevGuest)=>([ ...res.data.guests]));
            }
        })
    }, [])
    const onClickDelete = (id) => {
        axios.delete('/api/guestbook/', {
            data : {
                id
            }
        })
    }
    return (
        <TableArea>
            <Table>
                <TableHead>
                    <TableRow>
                        <Nick>닉네임</Nick>
                        <Content>내용</Content>
                        <Time colSpan="2">시간</Time>
                    </TableRow>    
                </TableHead>
                <TableBody>
                        {guest.map((val, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <Nick>{val.writer.nick}</Nick>
                                    <Content>{val.text}</Content>
                                    <Time>{val.date}</Time>
                                    <Delete><Button onClick={() => onClickDelete(val._id)}>X</Button> </Delete>
                                </TableRow>
                            ) 
                        })}
                </TableBody>
            </Table>
        </TableArea>
    )
}

export default Tablesection
