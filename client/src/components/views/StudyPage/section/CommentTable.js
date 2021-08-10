import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { loadStudyComment, deleteStudyComment } from '../../../../actions/StudyAction';

const useStyles = makeStyles(({
    area : {
        display : 'flex',
        alignItems : 'center',
        flexDirection : 'column',
    },
    deleteButton : {
        height: '100%',
        minWidth : 0,
        color : '#5e669c',
        lineHeight : 0,
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
    dateBtn : {
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

}))

function CommentTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState([]);
    const leng = useSelector(state => state.StudyReducer.commentLength);
    const { study } = useParams();
    const user = useSelector(state => state.UserReducer.user);
    
    useEffect(() => {
        dispatch(loadStudyComment(study))
        .then(res => {
            setComment(res.data);
        })
    },[dispatch, study, leng])

    const onClickDelete = (commentId, study) => () => {
        dispatch(deleteStudyComment(commentId, study))
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
                        <Box className={classes.dateBtn}>
                            <Box align='center'>
                                {val.date}
                            </Box>
                            <Box align='center'>
                                {val.user ?
                                    user._id === val.user._id || user.role === 3 ?
                                        <Button className={classes.deleteButton} onClick={onClickDelete(val._id, study)}>X</Button>
                                    :
                                        <></>
                                :
                                    user.role === 3 ?
                                        <Button className={classes.deleteButton} onClick={onClickDelete(val._id, study)}>X</Button>
                                    :
                                        <></>
                                }
                            </Box>
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
