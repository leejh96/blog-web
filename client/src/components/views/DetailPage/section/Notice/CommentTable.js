import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { loadComment, deleteNoticeComment } from '../../../../../actions/NoticeAction';
import { useParams } from 'react-router-dom';
import { Button, Box, Container, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'column',
        },
        commentArea : {
            width : '70%',
            border : '1px solid #c4c4c4',
            borderRadius : '3px',
            marginBottom : '20px',
        },
        user : {
            display : 'flex',
            justifyContent : 'space-between',
            borderBottom : '1px solid #c4c4c4',
            backgroundColor : '#f6f8fa',
            color : '#5e666f',
            padding : '10px 20px',
        },
        info : {
            display : 'flex',
            alignItems : 'center',
        },
        deleteBtn : {
            lineHeight : 0,
            minWidth : 0,
        },
        dateDelete : {
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
        },
        comment : {
            padding : '10px 20px',
            wordBreak:'break-all',
        },
        img : {
            marginRight : '10px',
            width : '5%',
        }
    }
});

function CommentTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState([]);
    const leng = useSelector(state => state.NoticeReducer.commentLength);
    const id = useParams().id;
    const user = useSelector(state => state.UserReducer.user);
    useEffect(() => {
        dispatch(loadComment(id))
        .then(res => {
            setComment(res.data);
        })
    },[dispatch, id, leng])

    const onClickDelete = (commentId, noticeId) => {
        dispatch(deleteNoticeComment(commentId, noticeId))
        .then(res => {
            setComment(res.data);
        })
    };
    return (
        <Container disableGutters className={classes.area}>
            { comment.map((val, idx) => (
                <Box className={classes.commentArea} key={val._id}>
                    <Box className={classes.user}>
                        <Box className={classes.info}>
                            { val.user.img ? 
                                <img className={classes.img} src={`/api/img/${val.user.img}`} alt='userImg'/>
                            :
                                <img className={classes.img} src={'/api/img/basic.png'} alt='userImg'/>
                            }
                            { val.user ? val.user.nick : '알수없음' }
                        </Box>
                        <Box className={classes.dateDelete}>
                            <Box align='center'>
                                {val.date}
                            </Box>
                            {val.user ?
                                user._id === val.user._id || user.role === 3 ?
                                    <Button className={classes.deleteBtn} onClick={() => onClickDelete(val._id, id)}>X</Button>
                                :
                                    <></>
                            :
                                user.role === 3 ?
                                    <Button className={classes.deleteBtn} onClick={() => onClickDelete(val._id, id)}>X</Button>
                                :
                                    <></>
                            }
                        </Box>
                    </Box>
                    <Box className={classes.comment}>
                        {val.comment.split('\n').map((value, index) => (
                            <span key={index}>{value}<br/></span>
                        ))}
                    </Box>
                </Box>
            )) }
        </Container>
    )
}

export default CommentTable
