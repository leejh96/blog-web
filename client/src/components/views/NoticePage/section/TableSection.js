import React, { useState, useEffect } from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useParams} from 'react-router-dom';
import Loading from '../../LoadingPage/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
const useStyles = makeStyles(theme => {
    return {
        table : {
            marginBottom : '30px',
        },
        number : {
            width : '10%',
        },
        title : {
            width : '50%',
        },
        author : {
            width : '20%',
        },
        date : {
            width : '20%',
        },
        link : {
            textDecoration : 'none',
            color : 'black',
            '&:hover' : {
                color : '#999999',
                textDecoration: 'underline',
            }
        }
    }
})


function TableSection() {
    const classes = useStyles();
    const page = useParams().page;
    const dispatch = useDispatch();
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(false);
    const searchNotice = useSelector(state => state.NoticeReducer.searchNotices);
    const user = useSelector(state => state.UserReducer.user);
    
    useEffect(() => {
        setLoad(true);
        dispatch(loadNotice())
        .then(res => {
            setPost(res.data.slice((page-1)*10, page*10));
            setLoad(false);
        })
        return () => {
            setPost([]);
            setLoad(false);
        }
    }, [dispatch, page])

    useEffect(() => {
        setPost(searchNotice);
    },[searchNotice])
    return (
        <Box>
            {load ?
            <Loading />
            :
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.number} align='center'>번호</TableCell>
                        <TableCell className={classes.title} align='center'>제목</TableCell>
                        <TableCell className={classes.author} align='center'>작성자</TableCell>
                        <TableCell className={classes.date} align='center'>작성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {post.map((val, i) => (
                    <TableRow key={val._id}>
                        <TableCell align='center'>{(page-1)*10 + (i+1)}</TableCell>
                        <TableCell align='center'><Link className={classes.link} to={user._id ? `/notice/${page}/${val._id}` : `/login`}>{val.title}</Link></TableCell>
                        <TableCell align='center'>{val.author ? val.author.nick : '알수없음'}</TableCell>
                        <TableCell align='center'>{val.date}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            }
        </Box>
    )
}

export default TableSection
