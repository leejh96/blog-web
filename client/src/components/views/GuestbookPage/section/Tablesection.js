import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const [guest, setGuest] = useState([]);
    useEffect(() => {
        axios.get('/api/guestbook/')
        .then(res => {
            if(res.data.success){
                return setGuest([...res.data.guests]);
            }
            return alert(res.data.message);
        })
    }, [])

    const onClickDelete = (id) => {
        axios.delete('/api/guestbook/', {
            data : {
                id
            }
        })
        .then(res => {
            if(res.data.success){
                return history.push('/guestbook');
            }
            alert(res.data.message);
            return history.push('/guestbook');
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
                            console.log(val);
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
