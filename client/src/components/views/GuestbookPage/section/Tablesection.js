import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import styled from 'styled-components';
import { useDispatch, useSelector  } from 'react-redux';
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
    
    // //useSelector의 값은 reducer에서의 return 값을 갖는다. 비구조화할당을 할경우 각각의 변수가
    // // state의 뭔 값을 의미하는지 정해주어야 한다. 
    // const {addGuestbook, delGuestbook} = useSelector(state => ({
    //     addGuestbook : state.GuestbookReducer.addGuestbook,
    //     delGuestbook : state.GuestbookReducer.delGuestbook
    // }));
function Tablesection({ page }) {
    console.log(page);
    const [guest, setGuest] = useState([]);
    const guestbookLength = useSelector(state => state.GuestbookReducer.guestlength);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadGuestBook())
        .then(res => {
            setGuest(res.data);
        })
    }, [dispatch, guestbookLength])

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
