import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGuestBook, loadGuestBook } from '../../../../actions/GuestbookAction';

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
    //useSelector의 값은 reducer에서의 return 값을 갖는다.
    const add = useSelector(state => state.GuestbookReducer.addGuestbook);
    const del = useSelector(state => state.GuestbookReducer.delGuestbook);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadGuestBook())
        .then(res => {
            setGuest(res.data)
        })
    }, [dispatch, add, del])

    const onClickDelete = (id) => {
        const data = { data : {id} };
        dispatch(deleteGuestBook(data))
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
