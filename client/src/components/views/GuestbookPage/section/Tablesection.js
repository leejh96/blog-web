import React, {useState, useEffect} from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'
import { useDispatch, useSelector  } from 'react-redux';
import { deleteGuestBook, loadGuestBook } from '../../../../actions/GuestbookAction';
import Loading from '../../LoadingPage/Loading';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
        area : {
            marginBottom : '20px'
        },
        nick : {
            width : '15%',
        },
        content : {
            width : '70%',
        },
        time : {
            width : '15%',
        },
        delete : {
            width : 'auto',
            '$:hover' : {
                display : 'inline',
            }
        }
    }
))

// //useSelector의 값은 reducer에서의 return 값을 갖는다. 비구조화할당을 할경우 각각의 변수가
// // state의 뭔 값을 의미하는지 정해주어야 한다. 
// const {addGuestbook, delGuestbook} = useSelector(state => ({
//     addGuestbook : state.GuestbookReducer.addGuestbook,
//     delGuestbook : state.GuestbookReducer.delGuestbook
// }));

function Tablesection({ page }) {
    const classes = useStyles();
    const [load, setLoad] = useState(false);
    const [guest, setGuest] = useState([]);
    const guestbookLength = useSelector(state => state.GuestbookReducer.guestlength);
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserReducer.user);
    const history = useHistory();
    useEffect(() => {
        setLoad(true);
        dispatch(loadGuestBook())
        .then(res => {
            //page.id에 따라 slice 하기 시작 : (page.id-1)*10, 끝 : page.id*10 - 1
            // slice는 끝이 undefined이면 배열 길이만큼만 리턴
            setGuest(res.data.slice((page.id-1)*10, page.id*10 -1));
            setLoad(false);
        })
    }, [dispatch, guestbookLength, page.id])

    const onClickDelete = (id) => {
        const data = { data : {id} };
        dispatch(deleteGuestBook(data))
        .then(history.push('/guestbook/1'))
    }

    return (
        <Box className={classes.area}>
            {load ? 
            <Loading />
            :
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.nick} align='center'>닉네임</TableCell>
                            <TableCell className={classes.content}align='center'>내용</TableCell>
                            <TableCell className={classes.date}colSpan="2" align='center'>작성일</TableCell>
                        </TableRow>    
                    </TableHead>
                    <TableBody>
                            {guest.map((val, idx) => {
                                return (
                                    <TableRow key={val._id}>
                                        <TableCell align='center'>{val.writer ? val.writer.nick : '알수없음'}</TableCell>
                                        <TableCell align='center'>{val.text}</TableCell>
                                        <TableCell align='center'>{val.date}</TableCell>
                                        {
                                            Object.keys(user).length !== 0 ?
                                                val.writer ?                                                
                                                    user._id === val.writer._id || user.role === 3?
                                                        <TableCell className={classes.delete}><Button onClick={() => onClickDelete(val._id)}>X</Button> </TableCell>
                                                    :
                                                        <></>
                                                :    
                                                    user.role === 3 ?
                                                        <TableCell className={classes.delete}><Button onClick={() => onClickDelete(val._id)}>X</Button> </TableCell>
                                                    :
                                                        <></>
                                            :
                                                <></>
                                        }
                                    </TableRow>
                                ) 
                            })}
                    </TableBody>
                </Table>
            }  
       </Box>
    )
}

export default Tablesection
