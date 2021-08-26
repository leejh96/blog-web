import React, { useState, useEffect } from 'react'
import { Box, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addLike, deleteLike } from '../../../../../actions/NoticeAction';
import { loadLike } from '../../../../../actions/NoticeAction';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ADD_LIKE, ADD_LIKE_ERROR, AUTH_ERROR, DELETE_LIKE, DELETE_LIKE_ERROR, LOAD_LIKE, LOAD_LIKE_ERROR, LOAD_LIKE_VALID_ERROR, SERVER_ERROR } from '../../../../../actions/type';

const useStyles = makeStyles(theme => {
    return {
        area : {
            marginBottom : '20px',
            textAlign : 'center',
        },
        onToggle : {
            '&:hover' : {
                backgroundColor : '#87cefa',
            }
        },
        icon : {
            marginRight : '10px'
        }
    }
})

function LikeButton() {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState(0);
    const [toggle, setToggle] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        dispatch(loadLike(id))
        .then(res => {
            if(res.type === LOAD_LIKE){
                res.data.like.includes(res.data.user) ? setToggle(1) : setToggle(0);
                return setCnt(res.data.like.length);
            }
            if(res.type === LOAD_LIKE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === LOAD_LIKE_VALID_ERROR){
                return history.push('/Notfound');
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login');
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        })
    },[dispatch, toggle, id, history])

    const onClickLike = () => {
        if(toggle === 0){
            dispatch(addLike(id))
            .then(res => {
                if(res.type === ADD_LIKE){
                    setCnt(res.data.notice.like.length);
                    return setToggle(1);
                }
                if(res.type === ADD_LIKE_ERROR){
                    return alert(res.data.message);
                }
                if(res.type === AUTH_ERROR){
                    alert(res.data.message);
                    return history.push('/login');
                }
                if(res.type === SERVER_ERROR){
                    return history.push('/error/500')
                }
            })
        }else{
            dispatch(deleteLike(id))
            .then(res => {
                if(res.type === DELETE_LIKE){
                    setCnt(res.data.notice.like.length);
                    return setToggle(0);
                }
                if(res.type === DELETE_LIKE_ERROR){
                    return alert(res.data.message);
                }
                if(res.type === AUTH_ERROR){
                    alert(res.data.message);
                    return history.push('/login');
                }
                if(res.type === SERVER_ERROR){
                    return history.push('/error/500')
                }
            })
        }
    };

    return (
        <Box className={classes.area}>
            { 
                toggle ? 
                <IconButton color='primary' className={classes.onToggle} variant='contained' onClick={onClickLike}><ThumbUpIcon className={classes.icon}/>{`${cnt}`}</IconButton>
                :
                <IconButton variant='contained' onClick={onClickLike}><ThumbUpIcon className={classes.icon}/>{`${cnt}`}</IconButton>
            }
        </Box>
    )
}

export default LikeButton
